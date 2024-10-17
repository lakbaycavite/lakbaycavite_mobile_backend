const Post = require('../model/postModel');
const path = require('path');



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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
