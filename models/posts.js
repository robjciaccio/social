const mongoose = require('mongoose')

const Schema = mongoose.Schema

const now = new Date()

const postsSchema = new Schema({
  content: { type: String, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  date: { type: String, require: true },
})

module.exports = mongoose.model('Posts', postsSchema)
