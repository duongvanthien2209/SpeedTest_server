const express = require('express');

const router = express.Router();

// Routes
const textRoute = require('../api/routes/text.route');
const userRoute = require('../api/routes/user.route');

router.use('/users', userRoute);
router.use('/texts', textRoute);

module.exports = router;
