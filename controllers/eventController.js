const Event = require('../model/eventModel');
const cloudinary = require('cloudinary');
const streamifier = require('streamifier');
require('dotenv').config();
const mongoose = require('mongoose');


// GET all events (ensuring image is included)
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ createdAt: -1 });

        // Ensure each event includes an image URL
        const eventsWithImages = events.map(event => ({
            _id: event._id,
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            image: event.image || null, // ✅ Siguraduhing may `image` field kahit wala
            place: event.place,
            barangay: event.barangay,
            color: event.color,
            isActive: event.isActive,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt
        }));

        res.status(200).json(eventsWithImages);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// const getEvents = async (req, res) => {
//     try {
//         const events = await Event.find({}).sort({ createdAt: -1 });
//          // Ensure each event includes an image URL
//          const eventsWithImages = events.map(event => ({
//             _id: event._id,
//             start: event.start,
//             end: event.end,
//             title: event.title,
//             description: event.description,
//             image: event.image || null, // ✅ Siguraduhing may `image` field kahit wala
//             place: event.place,
//             barangay: event.barangay,
//             color: event.color,
//             isActive: event.isActive,
//             createdAt: event.createdAt,
//             updatedAt: event.updatedAt
//         }));

//         res.status(200).json(eventsWithImages);
//     } catch (error) {
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

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
