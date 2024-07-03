const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/expense', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const expense = new Expense({ description, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/expense', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/total', async (req, res) => {
  try {
    const expenses = await Expense.find();
    let totalExpense = 0;
    let latestEntryTime = null;
    expenses.forEach(expense => {
      totalExpense += expense.amount;
      if (!latestEntryTime || expense.createdAt > latestEntryTime) {
        latestEntryTime = expense.createdAt;
      }
    });
    res.json({ totalExpense, latestEntryTime });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
