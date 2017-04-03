'use strict';

const User = require('../models/user')

const create = (req, res) => {
  return User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => matchError(res, err))

}

// criando jwt no login e enviando token
const login = (req, res) => {
  return User.login(req.body)
    .then(user => User.getJWT(user))
    .then(jwt => res.send({token: jwt}))
    .catch(err => matchError(res, err))
}

function matchError (res, err) {
  let response = {};
  if (err.errors[0].message.includes('unique')) {
    response = {
      status: 406,
      error: err.errors[0].message
    }
  } else {
    response = {
      status: 403 ,
      error:  err.errors[0].message
    }
  }

  return res.status(response.status).json({error: response.error})
}
module.exports = {
  create,
  login
};
