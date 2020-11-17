const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'public/uploads/' });

// Controllers
const userController = require('../controllers/user.controller');

// Tạo mới user
router.post('/', upload.single('avatar'), userController.postCreate);

// Lấy danh sách leaderBoard
router.get('/leaderBoard', userController.getLeaderBoard);

// Lấy lịch sử
router.get('/:id', userController.getHistory);

module.exports = router;
