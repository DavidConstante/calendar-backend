/*
  Routes user / auth
  host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { createUser, login, revalidateToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.post('/new',
  [// middlewares
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  createUser)

router.post('/',
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
  ],
  login)

router.get('/renew', validateJWT, revalidateToken)

module.exports = router