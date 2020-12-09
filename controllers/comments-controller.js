const Post = require('../models/posts')
const User = require('../models/users')
const Like = require('../models/likes')
const Comment = require('../models/comments')
const mongoose = require('mongoose')

const getComments = async (req, res, next) => {
  let comments

  try {
    comments = await Comment.find({})
  } catch (err) {
    console.log('line 162')
    next(err)
  }

  res.json({ comments })
}

const getCommentById = async (req, res, next) => {
  const comId = req.params.cid

  let comment
  try {
    comment = await Comment.findById(comId)
  } catch (err) {
    console.log('line 164')
    return next(err)
  }

  if (!comment) {
    const error = 'line 69'
    return next(err)
  }

  res.json({ comment: comment.toObject({ getters: true }) })
}

const commentPost = async (req, res, next) => {
  const { content, user_id, post_id } = req.body

  const now = Date()

  const newComment = new Comment({
    content,
    user_id,
    post_id,
    date: now,
  })

  let foundPost

  try {
    foundPost = await Post.findById(post_id)
    console.log(foundPost)
  } catch (err) {
    console.log('line 174')
    return next(err)
  }

  if (!foundPost) {
    console.log('line 179')
    next('line 180')
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await newComment.save({ session: sess })
    foundPost.comments.push(newComment)
    await foundPost.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    console.log('line 191')
    next(err)
  }

  res.status(201).json({ comment: newComment.toObject({ getters: true }) })
}

exports.commentPost = commentPost
exports.getCommentById = getCommentById
exports.getComments = getComments
