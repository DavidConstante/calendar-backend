const { response } = require('express')
const { generateJWT } = require('../helpers/jwt')
const bcrypt = require('bcryptjs')
const User = require('../models/user-schema')


const createUser = async (req, res = response) => { // <== The response help with the intellisense
  const { email, password } = req.body

  try {

    //Verify if the email exists
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        message: 'User already exists with that email'
      })
    }

    user = new User(req.body)

    //Encrypt the password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    const rta = await user.save()

    //Generate JWT
    const token = await generateJWT(user.id, user.name)



    res.status(201).json({
      ok: true,
      message: 'createUser',
      user: { ...rta._doc, token }
    })

  } catch (error) {
    // console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Talk to the admin'
    })
  }
}



const login = async (req, res = response) => {
  const { email, password } = req.body

  try {

    //Verify if the email exists
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: 'The user does not exist'
      })
    }

    //Verify the password
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'The password is not valid'
      })
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name)



    res.json({
      ok: true,
      message: 'login',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    })

  } catch (error) {
    // console.log(error)
    res.status(500).json({
      ok: false,
      message: 'Talk to the admin'
    })
  }
}



const revalidateToken = async (req, res = response) => {

  const { uid, name } = req

  //Generate new JWT
  const token = await generateJWT(uid, name)

  res.json({
    ok: true,
    message: 'revalidateToken',
    token
  })
}


module.exports = {
  createUser,
  login,
  revalidateToken
}