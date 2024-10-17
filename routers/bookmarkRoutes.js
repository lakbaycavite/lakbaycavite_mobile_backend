const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.post('/add', bookmarkController.addBookmark);
router.get('/get', bookmarkController.getBookmarks);
router.delete('/delete', bookmarkController.deleteBookmark);

module.exports = router;