const express = require('express')
// const cors = require('cors')
const errorHandler = require('errorhandler')
const morgan = require('morgan')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const fs = require('fs')
const path = require('path')
require('dotenv/config')
const PORT = process.env.PORT || 4001

app.use(express.json())
// app.use(cors())
app.use(errorHandler())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

const smRouter = require('./api/sm')
app.use('/sm', smRouter)

mongoose
  .connect(
    'mongodb+srv://robjciaccio:Rocco2574@cluster0.eewk1.mongodb.net/users?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(4001), console.log('listening on port 4001')
  })
  .catch((err) => {
    console.log(err)
  })

module.exports = app
