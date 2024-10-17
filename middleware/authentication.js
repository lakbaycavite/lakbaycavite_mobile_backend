<<<<<<< HEAD
require('dotenv').config(); 
=======
require('dotenv').config(); // Add this line at the top of your file
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
<<<<<<< HEAD
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
=======
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;