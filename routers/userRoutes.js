const express = require('express');
const router = express.Router();
const userController = require ('../controllers/userController');
const authService = require('../services/userservices');
const authMiddleware = require('../middleware/authentication')


<<<<<<< HEAD
=======
// User routes
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
router.put('/update', userController.updateUser);
router.get('/getallusers', authService.getAllUsers);
router.put('/getUserProfile', authService.getUserProfile);

module.exports = router;