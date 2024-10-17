const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getPosts } = require('../controllers/postController');

<<<<<<< HEAD

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
=======
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
  }
});

const upload = multer({ storage: storage });

<<<<<<< HEAD

router.post('/', upload.single('image'), createPost); 
router.get('/', getPosts); 
=======
// Define routes
router.post('/', upload.single('image'), createPost); // Handle post creation with file upload
router.get('/', getPosts); // Handle fetching posts
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07

module.exports = router;
