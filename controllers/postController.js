const Post = require('../model/postModel');
const path = require('path');


<<<<<<< HEAD

exports.createPost = async (req, res) => {
    try {
        const imageUrl = req.file ? `${global.baseUrl}/uploads/${req.file.filename}` : null;
        const newPost = new Post({
            content: req.body.content,
            profileName: req.body.profileName,
            imageUrl: imageUrl, 
            comments: [],
        });

        
        await newPost.save();

        const responsePost = {
            id: newPost._id, 
            content: newPost.content,
            profileName: newPost.profileName,
            imageUrl: newPost.imageUrl,
            comments: newPost.comments,
        };

        res.status(201).json(responsePost);
=======
// Create new post
exports.createPost = async (req, res) => {
    try {
        // Construct the full URL for the image
        const imageUrl = req.file ? `${global.baseUrl}/uploads/${req.file.filename}` : null;

        // Create a new post
        const newPost = new Post({
            content: req.body.content,
            profileName: req.body.profileName,
            imageUrl: imageUrl, // Store the full URL here
            comments: [],
        });

        // Save the post to the database
        await newPost.save();
        res.status(201).json(newPost);
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

<<<<<<< HEAD

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        const responsePosts = posts.map(post => ({
            id: post._id, // Explicitly include the ID
            content: post.content,
            profileName: post.profileName,
            imageUrl: post.imageUrl,
            comments: post.comments,
        }));
        res.status(200).json(responsePosts); // Return the formatted posts
=======
// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
