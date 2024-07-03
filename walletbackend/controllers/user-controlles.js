const express = require("express");
const User = require("../models/usermodel");
const router = express.Router();


router.post("/createuser", async (req, res) => {
    try {
        if (req.body.username && req.body.email && req.body.password) {
            const user = new User(req.body);
            user
            await user.save();
            res.send(user);
        } else {
            res.send("All fields are required");
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
