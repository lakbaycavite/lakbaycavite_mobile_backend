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
<<<<<<< HEAD
        type: Date,  
=======
        type: Date,  // Add a date field here
>>>>>>> 5abb461ca710a01936e209acf8b37720725d5a07
        required: true,
    },


}, {timestamps: true})

module.exports = mongoose.model('Event', eventSchema);