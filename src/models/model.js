const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
});

const User = mongoose.model('User', userSchema);

const portfolioSchema = new mongoose.Schema({
    title: { type: String },
    subtitle: { type: String },
    desc: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = {
    User,
    Portfolio,
};
