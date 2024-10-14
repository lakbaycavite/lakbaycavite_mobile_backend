const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getPosts } = require('../controllers/postController');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  }
});

const upload = multer({ storage: storage });

// Define routes
router.post('/', upload.single('image'), createPost); // Handle post creation with file upload
router.get('/', getPosts); // Handle fetching posts

module.exports = router;
