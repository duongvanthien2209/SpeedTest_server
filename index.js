require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(cors());

// Routes
const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});