const { validationResult } = require('express-validator')
const Post = require('../models/posts')
const User = require('../models/users')
const mongoose = require('mongoose')

const HttpError = require('../models/http-error')

const getPosts = async (req, res, next) => {
  let posts
  try {
    posts = await Post.find({})
  } catch (err) {
    res.status(404).json({ message: err })
  }

  if (!posts) {
    const error = 'No Posts found'
    return next(error)
  }
  res.json({ posts: posts })
}

const getPostById = async (req, res, next) => {
  const postId = req.params.pid

  let post
  try {
    post = await Post.findById(postId)
  } catch (err) {
    const error = new HttpError('could not find post', 500)
    return next(error)
  }

  if (!post) {
    const error = new HttpError('still cant find post', 404)
    return next(error)
  }

  res.json({ post: post.toObject({ getters: true }) })
}

const getPostByUid = async (req, res, next) => {
  const userId = req.params.uid
  let posts

  try {
    posts = await User.findById(userId).populate('posts')
  } catch (err) {
    res.status(500).json({ message: 'Could Not fetch posts from database' })
    console.log(posts)
    return next(err)
  }

  if (!posts) {
    const error = 'no Posts ?'
    return next(error)
  }
  console.log(posts)
  res.json({
    posts: posts.posts.map((post) => post.toObject({ getters: true })),
  })
}

const createPost = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed'))
  }

  const { content, user_id } = req.body
  const now = Date()

  const createdPost = new Post({
    content,
    user_id,
    date: now,
  })

  let user

  try {
    user = await User.findById(user_id)
  } catch (err) {
    const error = new HttpError('creating post failed', 500)
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find user to create post', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPost.save({ session: sess })
    user.posts.push(createdPost)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError('Your post was not created successfully', 500)
    return next(error)
  }

  res.status(201).json({ user: createdPost.toObject({ getters: true }) })
}

const likePost = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed'))
  }

  const { content, user_id, post_id } = req.body
  const now = Date()

  const postLike = new Post({
    content,
    user_id,
    likes: [],
    post_id,
    date: now,
  })

  let foundUser

  try {
    foundUser = await User.findById(user_id)
  } catch (err) {
    const error = new HttpError('creating post failed', 500)
    return next(error)
  }

  if (!user) {
    const error = new HttpError('Could not find user to create post', 404)
    return next(error)
  }

  let foundPost

  try {
    foundPost = await Post.findById(post_id)
  } catch (err) {
    console.log('error line 144 of posts controller')
    return next(err)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await postLike.save({ session: sess })
    foundPost.likes.push(postLike.user_id)
    await foundPost.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError('Your post was not created successfully', 500)
    return next(error)
  }

  res.status(201).json({ user: foundPost.toObject({ getters: true }) })
}

const deletePost = async (req, res, next) => {
  const postId = req.params.pid

  let post
  try {
    post = await Post.findById(postId).populate('user_id')
  } catch (err) {
    const error = new HttpError('Post was not deleted', 500)
    return next(error)
  }

  if (!post) {
    const error = new HttpError('count not find post', 404)
    return next(error)
  }

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await post.remove({ session: sess })
    post.user_id.posts.pull(post)
    await post.user_id.save({ session: sess })
    await sess.commitTransaction()
  } catch (err) {
    const error = new HttpError('Post not deleted', 500)
    return next(error)
  }

  res.status(200).json({ message: 'post deleted' })
}

exports.createPost = createPost
exports.deletePost = deletePost
exports.getPostById = getPostById
exports.getPosts = getPosts
exports.getPostByUid = getPostByUid
exports.likePost = likePost
