const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: String,
    id: String
});

module.exports = mongoose.model('TokenSchema', TokenSchema)