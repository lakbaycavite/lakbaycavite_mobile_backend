const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  username: {type: String, required: true, unique: true},
=======
  username: {type: String, required: true},
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  image: String,
  
});

module.exports = mongoose.model('User', userSchema);