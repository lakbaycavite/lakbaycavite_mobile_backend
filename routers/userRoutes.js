const express = require('express');
const router = express.Router();
const userController = require ('../controllers/userController');
const authService = require('../services/userservices');
const authMiddleware = require('../middleware/authentication')


router.put('/update', userController.updateUser);
router.get('/getallusers', authService.getAllUsers);
router.put('/getUserProfile', authService.getUserProfile);

module.exports = router;