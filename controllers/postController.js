const Post = require('../model/postModel');
const path = require('path');


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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
