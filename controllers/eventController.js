const Event = require('../model/eventModel');
const mongoose = require('mongoose');

// GET all events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// GET a single event by ID
const getEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({ error: "No such event found" });
    }
    res.status(200).json(event);
};

// UPDATE an event (kung may status update like isActive)
const updateEvent = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
        return res.status(404).json({ error: "No such event found" });
    }
    res.status(200).json(event);
};

module.exports = {
    getEvents,
    getEvent,
    updateEvent,
};
