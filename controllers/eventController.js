
const Event = require('../model/eventModel');

const mongoose = require('mongoose');

const getEvents = async (req, res ) =>{
    
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.status(200).json(events);
}

const getEvent = async (req, res) =>{
    const {id} = req.params;
    const event = await Event.findById(id)
    if (!event){
        res.status(404).json({error: 'No such event.'});
    } 
    res.status(200).json(event)
}
module.exports = {
    getEvent, 
    getEvents,
}