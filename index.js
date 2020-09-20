const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Routes
const apiRoute = require('./routes/api.route');

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});