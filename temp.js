// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config();
// const app = express();

// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('DB Connect Successfullt');
// }).catch((error) => {
//     console.error('DB not connect...', error.message);
//     process.exit(1);
// });

// const userModel = new mongoose.Schema({
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
// });

// const User = mongoose.model('User', userModel);

// const portfolioModel = new mongoose.Schema({
//     title: { type: String },
//     subtitle: { type: String },
//     desc: { type: String },
//     // auther: { type: String },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// });

// const Portfolio = mongoose.model('Portfolio', portfolioModel);

// app.post('/user/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ msg: 'User already available' });
//         }
//         user = new User({ name, email, password });
//         await user.save();
//         res.json({ msg: 'User registration successfully' });
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.post('/user/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         let user = await User.findOne({ email, password });
//         if (!user) {
//             return res.status(400).json({ msg: 'Wrong email or passsword' });
//         }
//         res.json({ msg: 'Login successful' });
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.get('/user/profile/:email', async (req, res) => { // find
//     try {
//         const user = await User.findOne({ email: req.params.email }).select('-password');
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.put('/user/profile/:email', async (req, res) => { // update
//     const { name, email, password } = req.body;
//     const updatedProfile = {};
//     if (name) updatedProfile.name = name;
//     if (email) updatedProfile.email = email;
//     if (password) updatedProfile.password = password;
//     try {
//         let user = await User.findOneAndUpdate({ email: req.params.email }, { $set: updatedProfile }, { new: true });
//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//     }
// });


// app.post('/portfolio', async (req, res) => { //insert
//     try {
//         const portfolio = new Portfolio({
//             title: req.body.title,
//             subtitle: req.body.subtitle,
//             desc: req.body.desc,
//             auther: req.body.auther,
//         });
//         await portfolio.save();
//         res.json(portfolio);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.get('/portfolio', async (req, res) => { //fetch data
//     try {
//         const portfolios = await Portfolio.find().populate('author', 'name email');
//         res.json(portfolios);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.get('/portfolio/:author', async (req, res) => { // find
//     try {
//         const portfolios = await Portfolio.find({ author: req.params.author }).populate('author', 'name email');
//         if (portfolios.length === 0) {
//             return res.status(404).json({ msg: 'Portfolios not found for this author' });
//         }
//         res.json(portfolios);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// app.put('/portfolio/:author', async (req, res) => { // update
//     try {
//         let portfolio = await Portfolio.findOneAndUpdate({ author: req.params.author }, { $set: req.body }, { new: true }).populate('author', 'name email');
//         if (!portfolio) {
//             return res.status(404).json({ msg: 'Portfolio not found for this author' });
//         }
//         res.json(portfolio);
//     } catch (err) {
//         console.error(err.message);
//     }
// });


// app.delete('/portfolio/:author', async (req, res) => { // delete
//     try {
//         const portfolio = await Portfolio.findOneAndDelete({ author: req.params.author });
//         if (!portfolio) {
//             return res.status(404).json({ msg: 'Portfolio not found for this author' });
//         }
//         res.json({ msg: 'Portfolio deleted...' });
//     } catch (err) {
//         console.error(err.message);
//     }
// });


// app.listen(3000, () => {
//     console.log('Server is running on 3000 port no.');
// });
