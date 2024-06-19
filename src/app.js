const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path : '../.env'});
const app = express();

const routes = require('./routes/routes.js');

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connect Successfully');
}).catch((error) => {
    console.error('DB not connect...', error.message);
    process.exit(1);
});

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
