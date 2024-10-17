const express = require('express');
const router = express.Router();

const { getDirections } = require('../controllers/directionsControllers');
router.get('/getDirect', getDirections);

module.exports = router;