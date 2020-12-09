const express = require('express')

const smRouter = express.Router()

const usersRouter = require('./users')

smRouter.use('/users', usersRouter)

module.exports = smRouter
