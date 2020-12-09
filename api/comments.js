const express = require('express')
const commentsRouter = express.Router()
const commentsController = require('../controllers/comments-controller')

commentsRouter.get('/', commentsController.getComments)

commentsRouter.get('/:cid', commentsController.getCommentById)

commentsRouter.post('/', commentsController.commentPost)

module.exports = commentsRouter
