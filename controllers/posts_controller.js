'use strict'

const Post = require('../models/post')
const matchError = require('./helpers/macth_erros')

const whereById = id => ({where: {id}})

const create = (req, res) => {
  return Post.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(matchError(res))
}

const get = (req, res) => {
  return Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(matchError(res))
}

const getAll = (req, res) => {
  return Post.find({})
    .then(posts => res.json(posts))
    .catch(matchError(res))
}

const update = (req, res) => {
  return Post
    .update(req.body, whereById(req.params.id))
    .then(result => res.status(202).json(result))
    .catch(matchError(res))
}

const del = (req, res) => {
  return Post
    .destroy(whereById(req.params.id))
    .then(() => res.status(204).json({}))
    .catch(matchError(res))
}

module.exports = {
  create,
  get,
  getAll,
  update,
  del
}
