const express = require("express");
const User = require("../models/usermodel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecretkey";
const { check, validationResult } = require("express-validator");

// Sign-up route
router.post("/signup", [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            success: false,
            message: errors.array()[0].msg,
            cause: "validation_error"
        });
    }
    try {
        const { username, email, password } = req.body;
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already exists",
                cause: "already_exists"
            });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).send("Error signing up");
    }
});

// Sign-in route
router.post("/signIn", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, jwtsecret, { expiresIn: '1h' }); // Added expiration time for better security
        res.json({ token });
    } catch (error) {
        console.error("Error signing in:", error);  // Log the error to the server console
        res.status(500).send("Error signing in");
    }
});

// Get user route
router.post("/getuser", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, jwtsecret);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTimestamp) {
            return res.status(401).json({ success: false, error: "Token expired" });
        }

        const { password, ...others } = user._doc;
        res.status(200).json({ success: true, ...others });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: "Token expired" });
        }
        console.error("Error getting user:", error);
        res.status(500).json({ success: false, error: "Error getting user" });
    }
});

module.exports = router;
