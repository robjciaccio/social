const express = require('express')
const postsRouter = express.Router()
const { check } = require('express-validator')
const postsController = require('../controllers/posts-controller')
const checkToken = require('../middleware/check-token')

const commentsRouter = require('./comments')
const likesRouter = require('./likes')

postsRouter.use('/like', likesRouter)
postsRouter.use('/comment', commentsRouter)

postsRouter.get('/:pid', postsController.getPostById)

postsRouter.get('/', postsController.getPosts)

postsRouter.get('/user/:uid', postsController.getPostByUid)

postsRouter.post('/', postsController.createPost)

postsRouter.delete('/:pid', postsController.deletePost)

module.exports = postsRouter
