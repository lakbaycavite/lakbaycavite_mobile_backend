const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: {type: String, required: true, unique: true},
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  image: { type: String, default: '' }, 
  isActive: {type: Boolean, default: true}
  
  
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);