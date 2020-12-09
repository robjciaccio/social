const express = require('express')
const usersRouter = express.Router()
const { check } = require('express-validator')
const usersController = require('../controllers/users-controller')
const fileUpload = require('../middleware/file-upload')

const postsRouter = require('./posts')
usersRouter.use('/posts', postsRouter)

usersRouter.get('/', usersController.getUsers)

usersRouter.post(
  '/signup',
  fileUpload.single('image'),
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
