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
User.sync();

User.getJWT =  user =>
  Promise.resolve(jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: user
  }, 'secret'))


User.login = credentias =>
  User.findOne({email:  credentias.email})
    .then(user => {
      if (bcrypt.compareSync(credentias.password, user.password)) {
        return user.toJSON()
      }
      throw new Error('invalid credentias')
    })



module.exports = User
