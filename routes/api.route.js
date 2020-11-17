const express = require('express');

const router = express.Router();

// Routes
const textRoute = require('./text.route');
const userRoute = require('./user.route');

router.use('/users', userRoute);
router.use('/texts', textRoute);

module.exports = router;
