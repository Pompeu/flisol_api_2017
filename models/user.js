'use strict'

const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../config/db.config')


const beforeCreate = user =>
  bcrypt.hash(user.get('password'), 10)
    .then(hash => (user.password = hash))

const fields = {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  }
}

const options = {
  freezeTableName: false
}

const User = sequelize.define('user', fields, options)

User.hook('beforeCreate',  beforeCreate)
User.sync()


const removePassword = user => {
  delete user.password
  return user
}

const getJWT = user =>
  Promise.resolve(jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: removePassword(user)
  }, 'secret'))


const comparePassworld = (credentias, user ) => {
  return bcrypt.compare(credentias.password, user.password)
    .then(isValdid => {
      if (isValdid) {
        return user.toJSON()
      }
    })
}

User.login = credentias =>
  User.findOne({email:  credentias.email})
    .then(user => comparePassworld(credentias, user))
    .then(getJWT)

module.exports = User
