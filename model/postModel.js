const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    username: String,
    createdAt: {type: Date, default: Date.now},
});


const postSchema = new mongoose.Schema({
    content: String,
    profileName: String,
    imageUrl: String,
    comments: [commentSchema],
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Post', postSchema);