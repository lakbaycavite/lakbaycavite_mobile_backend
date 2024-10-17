const Bookmark = require('../model/bookmarkModel');
const jwt = require('jsonwebtoken');
const Post = require('../model/postModel'); 
const mongoose = require('mongoose');

exports.addBookmark = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

   
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingBookmark = await Bookmark.findOne({ userId, postId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Post already bookmarked' });
    }

    const bookmark = new Bookmark({
      userId, 
      postId,
      content: post.content,
      profileName: post.profileName,
      imageUrl: post.imageUrl,
      comments: post.comments,
    });

    await bookmark.save();
    res.status(201).json({ message: 'Bookmark added successfully', bookmark });
  } catch (error) {
    console.error('Error adding bookmark:', error); 
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
};

exports.getBookmarks = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const bookmarks = await Bookmark.find({ userId: userId }).populate('postId');
  
      
      if (!bookmarks || bookmarks.length === 0) {
        return res.status(404).json({ message: 'No bookmarks found' });
      }
  
     
      res.status(200).json(bookmarks);
    } catch (error) {
      console.error('Error retrieving bookmarks:', error); 
      res.status(500).json({ error: 'Failed to get bookmarks' });
    }
  };


  exports.deleteBookmark = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      
      const { bookmarkId } = req.body;
  
      
      const bookmark = await Bookmark.findOneAndDelete({ _id: bookmarkId, userId: userId });
  
      
      if (!bookmark) {
        return res.status(404).json({ message: 'Bookmark not found' });
      }
  
      res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete bookmark' });
    }
  };