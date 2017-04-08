'use strict'

const User = require('../models/user')
const matchError = require('./helpers/macth_erros')

const create = (req, res) => {
  return User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(matchError(res))

}

const login = (req, res) => {
  return User.login(req.body)
    .then(jwt => res.send({token: jwt}))
    .catch(matchError(res))
}



module.exports = {
  create,
  login
}
