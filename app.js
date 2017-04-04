'use strict'

const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const users = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', users)

app.use(function(req, res) {
  const err = new Error('Not Found')
  err.status = 404
  res
    .status(err.status)
    .json({error: 'not found'})

})

app.use(function(err, req, res) {
  const message = err.message
  const error = req.app.get('env') === 'development' ? err : {}
  res
    .status(err.status || 500)
    .json({error,  message})
})

module.exports = app
