'use strict'


const Sequelize = require('sequelize')

const sequelize = new Sequelize('flisolapi', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
})

module.exports = sequelize
