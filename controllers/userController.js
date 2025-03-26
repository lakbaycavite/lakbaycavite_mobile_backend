const authService = require('../services/userservices');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');

exports.updateUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized, token missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      const { firstName, lastName, username, age, gender, image } = req.body;
  
      console.log("🛠 Received Update Data:");
      console.log("➡ First Name:", firstName);
      console.log("➡ Last Name:", lastName);
      console.log("➡ Username:", username);
      console.log("➡ Age:", age);
      console.log("➡ Gender:", gender);
      console.log("🖼 Image URL:", image); // ✅ Log kung natanggap ang image
  
      const updatedUser = await authService.updateUser(userId, { firstName, lastName, username, age, gender, image });
  
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
      console.log("✅ Profile update success:", updatedUser);
    } catch (err) {
      console.error("🔥 Error updating user:", err);
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  






// const authService = require('../services/userservices');
// const jwt = require('jsonwebtoken');


// exports.updateUser = async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1]; 

//   if (!token) {
//       return res.status(401).send({ message: 'Unauthorized, token missing' });
//   }

//   try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); 

//       const userId = decoded.id; 

//       const { firstName, lastName, username, age, gender, image } = req.body;
//       const updatedUser = await authService.updateUser(userId, { firstName, lastName, username, age, gender, image });
      
//       if (!updatedUser) {
//           return res.status(404).send({ message: 'User not found' });
//       }
      
//       res.json(updatedUser);
//       console.log(updatedUser);
//   } catch (err) {

//       return res.status(500).send({ message: 'Internal server error' });
//   }
// };