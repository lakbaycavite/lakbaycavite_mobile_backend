const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    place: {
        type: String,
        required: true,
    },
    barangay: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "#004aad",
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
