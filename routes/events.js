

const { Router } = require('express')
const { check } = require('express-validator')
const { getEvent, createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/events')
const { isDate } = require('../helpers/validators/isDate')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

//Validate JWT for all petitions
router.use(validateJWT)

// Get Event
router.get('/:id',
  getEvent)

// Get all events
router.get('/', getAllEvents)

// Create Event
router.post('/',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'The start date is required').custom(isDate),
    check('end', 'The end date is required').custom(isDate),
    validateFields
  ], createEvent)

// Update Event
router.put('/:id', updateEvent)

// Delete Event
router.delete('/:id', deleteEvent)


module.exports = router 