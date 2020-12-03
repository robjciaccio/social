const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const HttpError = require('../models/http-error')

const getUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, '-password') // or 'email first_name last_name'
  } catch (err) {
    const error = new HttpError('Fetching users failed', 500)
    return next(error)
  }
  res.json(users)
}

const getUserbyid = async (req, res, next) => {
  const userId = req.params.uid
  let user
  try {
    user = await User.findById(userId)
  } catch (err) {
    res.status(500).json({ message: 'users controller line 26 error' })
    console.log(user)
    return next(err)
  }

  res.json({
    user: user.toObject({ getters: true }),
  })
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    )
  }
  const { first_name, last_name, email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError('Sign Up failed, Please Try Again', 500)
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead',
      422
    )
    return next(error)
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    res.status(500).json({ message: err })
    return next(error)
  }

  const createdUser = new User({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    posts: [],
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError(
      'Sign Up failed, try again and again and again and again',
      500
    )
    return next(error)
  }

  let token
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      'secret_key',
      { expiresIn: '24h' }
    ) // can add any info here ex: name, email, birthday etc..
  } catch (error) {
    res.status(500).json({ message: error })
    return next(error)
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    posts: createdUser.posts,
    first_name: createdUser.first_name,
    last_name: createdUser.last_name,
  })

  // toObject turns into js object //getters: true removes underscore infront of ID
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    res.status(500).json({ message: err })
    return next(err)
  }

  if (!existingUser) {
    const error = 'You fucked up the Username and/Or Password'
    res.status(500).json({ message: error })
    return next(err)
  }

  let isValidPassword = true
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    res.status(500).json({ message: err })
    return next(err)
  }

  if (!isValidPassword) {
    const error = 'Invalid password'
    res.status(500).json({ message: error })
    return next(error)
  }

  let token
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        first_name: existingUser.first_name,
        last_name: existingUser.last_name,
        posts: existingUser.posts,
      },
      'secret_key',
      { expiresIn: '24h' }
    ) // can add any info here ex: name, email, birthday etc..
  } catch (error) {
    res.status(500).json({ message: error })
    return next(error)
  }

  res.json({
    userId: existingUser.id,
    first_name: existingUser.first_name,
    last_name: existingUser.last_name,
    posts: existingUser.posts,
    email: existingUser.email,
    token: token,
  })
}

exports.getUsers = getUsers
exports.getUserbyid = getUserbyid
exports.signup = signup
exports.login = login
