const express = require('express');

const {getEvent,getEvents} = require('../controllers/eventController');

const router = express.Router()

router.get('/:id', getEvent);
router.get('/', getEvents);

module.exports = router