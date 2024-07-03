// routes/incomeRoutes.js

const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

router.post('/income', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const income = new Income({ description, amount });
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/income', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/total', async (req, res) => {
  try {
    const incomes = await Income.find();
    let totalIncome = 0;
    let latestEntryTime = null;
    incomes.forEach(income => {
      totalIncome += income.amount;
      if (!latestEntryTime || income.createdAt > latestEntryTime) {
        latestEntryTime = income.createdAt;
      }
    });
    res.json({ totalIncome, latestEntryTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
