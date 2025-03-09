const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createPost, getPosts, addComment, getComments } = require('../controllers/postController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/posts', upload.single('image'), createPost); 
router.get('/', getPosts); 
router.post('/:postId/comments', addComment);// handiling adding a comment
router.get('/posts/:postId/comments', getComments);
module.exports = router;
