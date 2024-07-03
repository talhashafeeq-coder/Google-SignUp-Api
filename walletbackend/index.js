require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const crypto = require('crypto');
const session = require('express-session');
const userRoutes = require('./controllers/userRoutes-controllers');
const incomeRoutes = require('./controllers/income-controllers');
const expenseRoutes = require('./controllers/expense-controllers');
const TokenSchema = require('./models/tokens');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/usermodel');
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 3000;
const jwtsecret = 'mysecretkey';
const mongoUrl = process.env.MONGO_URL;
const Google_cleint_id = process.env.GOOGLE_CLIENT_ID;
const Google_cleint_secret = process.env.GOOGLE_CLIENT_SECRET;
const CallURL = process.env.Callback_URL;


// MongoDB connection
mongoose.connect(mongoUrl).then(() => console.log(`MongoDB Connected is  ${PORT}`))
  .catch(err => console.error(err));
if (!mongoUrl) {
  throw new Error("MONGO_URL environment variable is not set");
}
// Passport config
const encryptPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

let ourUserId = "";
passport.use(new GoogleStrategy({
  clientID: Google_cleint_id,
  clientSecret: Google_cleint_secret,
  callbackURL: CallURL
},
  //Google Strategy
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = profile._json;
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        const password = Math.random().toString(36).slice(-8);
        const { salt, hash } = encryptPassword(password);
        const newUser = new User({
          username: user.name,
          email: user.email,
          password: hash,
          salt: salt
        });
        await newUser.save();
        done(null, newUser);
      }
      const ourUser = await User.findOne({ email: user.email });
      const token = jwt.sign({ _id: ourUser._id }, jwtsecret);
      const newToken = new TokenSchema({
        token: token,
        id: ourUser._id
      });
      ourUserId = ourUser._id;
      await newToken.save();
      done(null, token);
    } catch (error) {
      done(null, null);
    }
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  return done(null, id);
});

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:5173/savetoken/${ourUserId}`);
  }
);
//Getuser route
app.post('/gettoken', async (req, res) => {
  const { id } = req.body;
  const token = await TokenSchema.findOne({ id });
  if (!token) {
    return res.status(404).json({ error: "Token not found" });
  }
  res.json({ token: token.token });
});

// API Routes
app.use("/api/users", userRoutes);
app.use('/api/users', incomeRoutes);
app.use('/api/users', expenseRoutes);

// Route for calculating balance
app.get('/api/balance', async (req, res) => {
  try {
    // Fetch all incomes
    const incomes = await Income.find();

    // Fetch all expenses
    const expenses = await Expense.find();

    // Calculate total income
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);

    // Calculate total expense
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate balance
    const balance = totalIncome - totalExpense;
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
