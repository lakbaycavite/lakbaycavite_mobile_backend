const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: {type: String, required: true},
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  image: String,
  
});

module.exports = mongoose.model('User', userSchema);