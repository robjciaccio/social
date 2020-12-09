const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postsSchema = new Schema({
  content: { type: String, required: true },
  image: { type: String, required: false },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  image: { type: String, required: false },
  likes: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Likes' }],
  date: { type: String, require: true },
  comments: [
    { type: mongoose.Types.ObjectId, required: false, ref: 'Comments' },
  ],
})

module.exports = mongoose.model('Posts', postsSchema)
