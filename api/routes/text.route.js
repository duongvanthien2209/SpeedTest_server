const express = require('express');
const router = express.Router();

// Controllers
const textController = require('../controllers/text.controller');

// Get random text
router.get('/', textController.getRandomText);

module.exports = router;