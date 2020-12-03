const express = require('express')
const usersRouter = express.Router()
const { check } = require('express-validator')
const usersController = require('../controllers/users-controller')

usersRouter.get('/', usersController.getUsers)
const postsRouter = require('./posts')
usersRouter.use('/posts', postsRouter)

usersRouter.post(
  '/signup',
  [
    check('first_name').not().isEmpty(),
    check('last_name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  usersController.signup
)

usersRouter.get('/:uid', usersController.getUserbyid)

usersRouter.post('/login', usersController.login)

module.exports = usersRouter
