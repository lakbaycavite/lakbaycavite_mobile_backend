const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    likePost,
    addComment,
    getComments,
    createPost,
    uploadMiddleware
} = require('../controllers/postController');

// ✅ Routes
router.get('/', getPosts); // Fetch all posts
router.post('/', uploadMiddleware, createPost); // Create a post (with image support)
router.get('/posts/:postId', getPost); // Fetch a single post
router.post('/posts/:postId/like', likePost); // Like a post
router.post('/posts/:postId/comments', addComment); // Add a comment to a post
router.get('/posts/:postId/comments', getComments); // Fetch comments on a post

module.exports = router;
