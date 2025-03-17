const Post = require('../model/postModel');
const path = require('path');

// Get All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username profileImage'); // ✅ Ensure `user` has correct fields
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Create post
exports.createPost = async (req, res) => {
    try {
        const { content, user } = req.body; // ✅ Extract user ID from request

        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const imageUrl = req.file ? `https://lakbaycavite-mobile-backend-2109bdtaz-lakbaycavites-projects.vercel.app/uploads/${req.file.filename}` : null;

        const newPost = new Post({
            content,
            user,
            attachments: req.file ? [`https://lakbaycavite-mobile-backend-2109bdtaz-lakbaycavites-projects.vercel.app/uploads/${req.file.filename}`] : [], // ✅ Image is stored in attachments
            comments: [],
            is_hidden: false,
            likedBy: []
        });


        await newPost.save();

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
};

// exports.createPost = async (req, res) => {
//      console.log("📌 Received a POST request for /api/posts"); // ✅ Debugging
//      console.log("🔍 Request Body:", req.body);
//      console.log("📸 Uploaded File:", req.file);
//     try {
        
//         const imageUrl = req.file ? `${global.baseUrl}/uploads/${req.file.filename}` : null;
//         console.log("✅ Image uploaded:", imageUrl); // ✅ Debugging
//         const newPost = new Post({
//             content: req.body.content,
//             user: req.body.user,
//             imageUrl: imageUrl, 
//             comments: [],
//         });

//         await newPost.save();
//         console.log("✅ Post created:", newPost); // ✅ Debugging

//         res.status(201).json({ message: 'Post created successfully', post: newPost });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating post', error });
//     }
// };


// Get Single Post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('user', 'username');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post", error });
    }
};

// Like a Post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.likedBy.includes(req.body.userId)) {
            post.likedBy.push(req.body.userId);
        } else {
            post.likedBy = post.likedBy.filter(id => id.toString() !== req.body.userId);
        }

        await post.save();
        res.status(200).json({ message: "Post like updated", likedBy: post.likedBy });
    } catch (error) {
        res.status(500).json({ message: "Error liking post", error });
    }
};

// Add Comment to Post
exports.addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            comment: req.body.comment,
            username: req.body.username,
        };
        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: "Comment added", comments: post.comments });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
};

// Get Comments
exports.getComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error });
    }
};







// const Post = require('../model/postModel');
// const path = require('path');



// exports.createPost = async (req, res) => {
//     try {
//         const imageUrl = req.file ? `${global.baseUrl}/uploads/${req.file.filename}` : null;
//         const newPost = new Post({
//             content: req.body.content,
//             profileName: req.body.profileName,
//             imageUrl: imageUrl, 
//             comments: [],
//         });

        
//         await newPost.save();

//         const responsePost = {
//             id: newPost._id, 
//             content: newPost.content,
//             profileName: newPost.profileName,
//             imageUrl: newPost.imageUrl,
//             comments: newPost.comments,
//         };

//         res.status(201).json(responsePost);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// exports.getPosts = async (req, res) => {
//     try {
//         const posts = await Post.find();
//         const responsePosts = posts.map(post => ({
//             id: post._id, // Explicitly include the ID
//             content: post.content,
//             profileName: post.profileName,
//             imageUrl: post.imageUrl,
//             comments: post.comments,
//             createdAt: post.createdAt,
//         }));
//         res.status(200).json(responsePosts); // Return the formatted posts
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// //add comment to a post
// exports.addComment = async(req, res) =>{
//     try{
//         console.log("Request Body:", req.body);
//         const post = await Post.findById(req.params.postId);
//         console.log("post found:", post);

//         if (!post){
//             return res.status(404).json({ message: 'Post not found'});
//         }
//         const newComment = {
//             comment: req.body.comment,
//             username: req.body.username,
//         };
//         post.comments.push(newComment);
//         await post.save();

//         res.status(201).json({ message: 'Comment added', post});

//     } catch(error){
//         console.error("Error adding comment", error);
//         res.status(500).json({ message: 'Error adding comment', error});
//     }
// };

// exports.getComments = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.status(200).json(post.comments);
//     } catch (error) {
//         console.error("Error fetching comments", error);
//         res.status(500).json({ message: 'Error fetching comments', error });
//     }
// };


