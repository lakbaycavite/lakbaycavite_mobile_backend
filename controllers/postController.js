const Post = require('../model/postModel');
const cloudinary = require('cloudinary').v2
const User = require('../model/userModel'); // ✅ Import User Model
const streamifier = require('streamifier');
const multer = require('multer');
require('dotenv').config();

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer ({storage: storage});

// Get All Posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username image') // ✅ Siguraduhin may 'image'
            .sort({ createdAt: -1 });

            console.log("✅ Posts API Response:", JSON.stringify(posts, null, 2)); // 📌 Log all posts

        res.json(posts);
    } catch (error) {
        console.error("❌ Error fetching posts:", error);
        res.status(500).json({ message: 'Error fetching posts', error });
        
    }
};

// exports.getPosts = async (req, res) => {
//     try {
//         const posts = await Post.find().populate('user', 'username image'); // ✅ Ensure `user` has correct fields
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching posts', error });
//     }
// };

// ✅ Create Post Controller (With Cloudinary Upload)
exports.createPost = async (req, res) => {
    try {
        const { content, user } = req.body;
        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // ✅ Get the user details along with their profile image
        const userInfo = await User.findById(user, 'username image');
        if (!userInfo) {
            return res.status(404).json({ message: "User not found" });
        }

        let imageUrl = null;
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'lakbaycavite/posts' },
                    (error, result) => (error ? reject(error) : resolve(result))
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

            imageUrl = result.secure_url;
        }

        // ✅ Ensure `profileImage` is stored
        const newPost = new Post({
            content,
            user,
            profileImage: userInfo.image, // ✅ Get user's profile image
            attachments: imageUrl ? [imageUrl] : [],
            comments: [],
            is_hidden: false,
            likedBy: [],
        });

        await newPost.save();

        console.log("✅ Post Created with Image:", newPost); // Debugging

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('❌ Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error });
    }
};



// exports.createPost = async (req, res) => {
//     try {
//       const { content, user } = req.body; // Ensure user ID is included
  
//       if (!user) {
//         return res.status(400).json({ message: 'User ID is required' });
//       }
  
//       let imageUrl = null;
      
//       if (req.file) {
//         // Upload image to Cloudinary
//         const result = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: 'lakbaycavite/posts' },
//             (error, result) => (error ? reject(error) : resolve(result))
//           );
//           streamifier.createReadStream(req.file.buffer).pipe(stream);
//         });
  
//         imageUrl = result.secure_url; // Get the Cloudinary image URL
//       }
  
//       // ✅ Create Post (Include User Profile Image)
//       const newPost = new Post({
//         content,
//         user,
//         profileImage: userData.image || '', // ✅ Store the user’s profile image
//         attachments: imageUrl ? [imageUrl] : [],
//         comments: [],
//         is_hidden: false,
//         likedBy: [],
//     });
  
//       await newPost.save();
  
//       res.status(201).json({ message: 'Post created successfully', post: newPost });
//     } catch (error) {
//       console.error('❌ Error creating post:', error);
//       res.status(500).json({ message: 'Error creating post', error });
//     }
//   };
  
  // ✅ Multer Middleware Export (For Routes)
  exports.uploadMiddleware = upload.single('image');


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