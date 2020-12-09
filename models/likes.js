const mongoose = require('mongoose')

const Schema = mongoose.Schema

const likesSchema = new Schema({
  user_id: { type: String, required: true, ref: 'User' },
  post_id: { type: String, required: true, ref: 'Post' },
  date: { type: String, require: true },
})

module.exports = mongoose.model('Likes', likesSchema)
