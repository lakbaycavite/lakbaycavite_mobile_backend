require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired' }); // ✅ Clear error message
    }
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required." });
  }

  try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token: newToken });
  } catch (error) {
      res.status(403).json({ message: "Invalid refresh token." });
  }
};

module.exports = authMiddleware;




// require('dotenv').config(); 
// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ msg: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;