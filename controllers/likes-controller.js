const Post = require('../models/posts')
const User = require('../models/users')
const Like = require('../models/likes')
const Comment = require('../models/comments')
const mongoose = require('mongoose')

const likePost = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed'))
  }

  const { user_id, post_id } = req.body
  const now = Date()

  const newLike = new Like({
    user_id,
    post_id,
    date: now,
  })

  let foundPost

  try {
    foundPost = await Post.findById(post_id)
    console.log(newLike)
  } catch (err) {
    console.log('error line 144 of posts controller')
    return next(err)
  }

  if (!foundPost) {
    console.log('error line 134')
    const error = 'error line 134'
    next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await newLike.save({ session: sess })
    foundPost.likes.push(newLike)
    await foundPost.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    console.log('line 143')
    next(err)
  }

  res.status(201).json({ likedPost: newLike.toObject({ getters: true }) })
}

exports.likePost = likePost
