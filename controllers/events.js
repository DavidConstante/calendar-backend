const { response } = require('express')
const Event = require('../models/event-schema')


const getEvent = async (req, res = response) => {

}

const getAllEvents = async (req, res = response) => {

  try {

    // The populate method is used to get the user name from the user collection
    const events = await Event.find()
      .populate('user', 'name email')

    res.status(200).json({
      ok: true,
      events
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Talk to the admin'
    })
  }

}

const createEvent = async (req, res = response) => {

  const event = new Event(req.body)

  try {
    event.user = req.uid // The uid came from the validateJWT middleware
    const rta = await event.save()

    res.status(201).json({
      ok: true,
      message: 'createEvent',
      rta
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Talk to the admin'
    })
  }
}

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId)

  if (!event) {
    res.status(404).json({
      ok: false,
      message: 'Event not found'
    })
  }

  // Validate that the user is the owner of the event
  if (event.user.toString() !== req.uid) {
    res.status(401).json({
      ok: false,
      message: 'You do not have permission to edit this event'
    })
    return;
  }

  const updatedEvent = {
    ...req.body,
    user: req.uid
  }

  try {
    const rta = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true }) // The new: true option returns the updated event

    res.status(200).json({
      ok: true,
      message: 'updateEvent',
      rta
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Talk to the admin'
    })
  }

}

const deleteEvent = async (req, res = response) => {

  try {

    const eventId = req.params.id;

    // Validate that the event exists
    const event = await Event.findById(eventId)
    if (!event) {
      res.status(404).json({
        ok: false,
        message: 'Event not found'
      })
    }

    // Validate that the user is the owner of the event
    if (event.user.toString() !== req.uid) {
      res.status(401).json({
        ok: false,
        message: 'You do not have permission to delete this event'
      })
    }

    const rta = await Event.findByIdAndDelete(eventId)

    res.status(200).json({
      ok: true,
      message: 'deleteEvent',
      rta
    })


  } catch (error) {

  }

}

console.log(new Date())

module.exports = {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
}