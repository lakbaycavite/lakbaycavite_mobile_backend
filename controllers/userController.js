const authService = require('../services/userservices');
const jwt = require('jsonwebtoken');

exports.updateUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
      return res.status(401).send({ message: 'Unauthorized, token missing' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

      const userId = decoded.id; 

      const { firstName, lastName, username, age, gender, image } = req.body;
      const updatedUser = await authService.updateUser(userId, { firstName, lastName, username, age, gender, image });
      
      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found' });
      }
      
      res.json(updatedUser);
  } catch (err) {

      return res.status(500).send({ message: 'Internal server error' });
  }
};