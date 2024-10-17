const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({

    title: {
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
    },
    attachments:{
        type:[String],
        required: false,
    },
    eventType:{
        type: String,
        required: false,
    },
    date: {
        type: Date,  
        required: true,
    },


}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema);