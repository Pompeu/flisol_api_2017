'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../config/db.config')

const fields = {
  title: {
    type: Sequelize.STRING,
    unique: true
  },
  body: {
    type: Sequelize.STRING,
  }
}

const options = {
  freezeTableName: false
}

const Post = sequelize.define('post', fields, options)
Post.sync()

module.exports = Post
