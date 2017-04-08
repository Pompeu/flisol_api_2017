'use strict'

const express = require('express')
const router = express.Router()
const {create, login} = require('../controllers/users_controller')

router
  .post('/', create)
  .post('/login', login)

module.exports = router
