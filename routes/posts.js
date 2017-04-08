'use strict'

const express = require('express')
const router = express.Router()
const {create, get, getAll, update, del} = require('../controllers/posts_controller')

router
  .post('/', create)
  .get('/:id', get)
  .get('/', getAll)
  .put('/:id', update)
  .delete('/:id', del)

module.exports = router
