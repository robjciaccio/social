const express = require('express')
const likesRouter = express.Router()
const likesController = require('../controllers/likes-controller')

likesRouter.post('/', likesController.likePost)

module.exports = likesRouter
