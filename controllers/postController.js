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
            createdAt: post.createdAt,
        }));
        res.status(200).json(responsePosts); // Return the formatted posts
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//add comment to a post
exports.addComment = async(req, res) =>{
    try{
        console.log("Request Body:", req.body);
        const post = await Post.findById(req.params.postId);
        console.log("post found:", post);

        if (!post){
            return res.status(404).json({ message: 'Post not found'});
        }
        const newComment = {
            comment: req.body.comment,
            username: req.body.username,
        };
        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: 'Comment added', post});

    } catch(error){
        console.error("Error adding comment", error);
        res.status(500).json({ message: 'Error adding comment', error});
    }
};

exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post.comments);
    } catch (error) {
        console.error("Error fetching comments", error);
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};


