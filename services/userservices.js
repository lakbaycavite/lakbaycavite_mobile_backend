const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const emailService = require('../services/emailService');

let verificationCodes = {};
let verifiedUsers = {};

exports.generateAndSendVerificationCode = async (email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already registered');

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  verificationCodes[email] = verificationCode; 

  const subject = 'Email Verification Code';
  const text = `Your verification code is: ${verificationCode}`;


  await emailService.sendEmail(email, subject, text); 
  return 'Verification code sent';
};



exports.verifyCode = (email, code) => {
  if (verificationCodes[email] && verificationCodes[email] == code) {
    verifiedUsers[email] = true;
    delete verificationCodes[email];
    return { success: true, message: 'Code verified successfully' };
  } else {
    return { success: false, message: 'Invalid or expired code' };
  }
};

exports.registerUser = async (email, password, username) => {

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegExp.test(email)) {
    throw new Error('Invalid email format');
  }

<<<<<<< HEAD
  const usernameRegExp = /^[a-zA-Z0-9_]{3,20}$/; 
  if (!usernameRegExp.test(username)) {
    throw new Error('Username must be between 3 and 20 characters long and can only contain letters, numbers, and underscores');
  }

  const existingusername = await User.findOne({ username });
    if (existingusername){
      throw new Error('Username already exist')
    };
  

=======
  const usernameRegExp = /^[a-zA-Z0-9_]{5,12}$/; 
  if (!usernameRegExp.test(username)) {
    throw new Error('Username must be between 5 and 12 characters long and can only contain letters, numbers, and underscores');
  }

>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }


  if (!verifiedUsers[email]) {
    throw new Error('Email not verified');
  }


  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegExp.test(password)) {
    throw new Error('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character');
  }


  const hashedPassword = await bcrypt.hash(password, 10);
  

<<<<<<< HEAD
  const user = new User({ email, password: hashedPassword, username, firstName, lastName });
=======
  const user = new User({ email, password: hashedPassword, username, firstName, lastName, age, gender });
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
  await user.save();
  

  delete verifiedUsers[email];

  return 'User registered successfully';
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

<<<<<<< HEAD
  
=======
  // Generate a token for the user
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  
  return {
    token,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    image: user.image,
  };
};

exports.updateUser = async (userId, updateData) => {
  try {
<<<<<<< HEAD
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData, 
      { new: true, runValidators: true }
    );

   
=======
    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData, // Pass the update data object
      { new: true, runValidators: true }
    );

    // Check if the update was successful
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    if (!updatedUser) {
      throw new Error('User not found');
    }

<<<<<<< HEAD
    
=======
    // Return a success message along with the updated user
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    return {
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    };

  } catch (error) {
<<<<<<< HEAD
    
=======
    // Return error message
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    return {
      success: false,
      message: error.message || 'Failed to update user',
    };
  }
};

exports.getUserProfile = async (req, res) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ error: 'Token missing from authorization header' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; 


    const user = await User.findOne({ email: userId }); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      age: user.age,
      email: user.email,
      gender: user.gender,
      image: user.image, 
      
    };

    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
exports.getAllUsers = async () => {
  return await User.find({}).sort({ createdAt: -1 });
};