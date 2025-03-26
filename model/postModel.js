const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    username: String,
    createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profileImage: { type: String }, // ✅ Ensure we store profileImage in the database
    attachments: [{ type: String }], // List of image/file URLs
    comments: [commentSchema], // List of comments
    is_hidden: { type: Boolean, default: false }, // Visibility toggle
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users who liked the post
    //bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of users who bookmarked
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);


// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//     comment: String,
//     username: String,
//     createdAt: {type: Date, default: Date.now},
// });


// const postSchema = new mongoose.Schema({
//     content: String,
//     profileName: String,
//     imageUrl: String,
//     comments: [commentSchema],
//     createdAt: {type: Date, default: Date.now},
// });

// module.exports = mongoose.model('Post', postSchema);