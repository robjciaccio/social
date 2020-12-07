const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentsSchema = new Schema({
  content: { type: String, required: true },
  likes: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }],
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
  date: { type: String, require: true },
})

module.exports = mongoose.model('Comments', commentsSchema)
