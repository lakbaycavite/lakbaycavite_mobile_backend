const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    profileName: String,
    imageUrl: String,
    comments: [String],
});

module.exports = mongoose.model('Post', postSchema);