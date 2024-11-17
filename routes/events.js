const express = require('express');
const Event = require('../models/event');
const path = require('path');
const { log } = require('console');
const router = express.Router();

// Add an event
router.post('/add', async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = new Event({ title, description, date });
    await event.save();
    res.status(201).send('Event added successfully');
  } catch (error) {
    res.status(400).send('Error adding event: ' + error.message);
  }
});

// Get all events (sorted by date)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send('Error retrieving events: ' + error.message);
  }
});
router.get('/page',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'),(err)=>{
        console.log('error in loadingthe file');
        
    })
})




// Get only upcoming events
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).send('Error retrieving upcoming events: ' + error.message);
  }
});

module.exports = router;
