const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const usersSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Posts' }],
})

usersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Users', usersSchema)
