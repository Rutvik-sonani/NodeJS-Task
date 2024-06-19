const express = require('express');
const router = express.Router();
const { User, Portfolio } = require('../models/model.js');

router.post('/user/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already available' });
        }
        user = new User({ name, email, password });
        await user.save();
        res.json({ msg: 'User registration successfully' });
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ msg: 'Wrong email or password' });
        }
        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/user/profile/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
    }
});

router.put('/user/profile/:email', async (req, res) => {
    const { name, email, password } = req.body;
    const updatedProfile = {};
    if (name) updatedProfile.name = name;
    if (email) updatedProfile.email = email;
    if (password) updatedProfile.password = password;
    try {
        let user = await User.findOneAndUpdate({ email: req.params.email }, { $set: updatedProfile }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/portfolio', async (req, res) => {
    try {
        const portfolio = new Portfolio({
            title: req.body.title,
            subtitle: req.body.subtitle,
            desc: req.body.desc,
            author: req.body.author,
        });
        await portfolio.save();
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/portfolio', async (req, res) => {
    try {
        const portfolios = await Portfolio.find().populate('author', 'name email');
        res.json(portfolios);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/portfolio/:author', async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ author: req.params.author }).populate('author', 'name email');
        if (portfolios.length === 0) {
            return res.status(404).json({ msg: 'Portfolios not found for this author' });
        }
        res.json(portfolios);
    } catch (err) {
        console.error(err.message);
    }
});

router.put('/portfolio/:author', async (req, res) => {
    try {
        let portfolio = await Portfolio.findOneAndUpdate({ author: req.params.author }, { $set: req.body }, { new: true }).populate('author', 'name email');
        if (!portfolio) {
            return res.status(404).json({ msg: 'Portfolio not found for this author' });
        }
        res.json(portfolio);
    } catch (err) {
        console.error(err.message);
    }
});

router.delete('/portfolio/:author', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOneAndDelete({ author: req.params.author });
        if (!portfolio) {
            return res.status(404).json({ msg: 'Portfolio not found for this author' });
        }
        res.json({ msg: 'Portfolio deleted...' });
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
