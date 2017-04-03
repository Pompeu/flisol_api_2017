'use strict'

const request = require('supertest')
const expect = require('chai').expect
const app = require('../../app')

const User = require('../../models/user')

describe('User api module', () => {
  const user = {
    name: 'Pompeu',
    email: 'pompeulimp@gmail.com',
    password: '12345',
  }

  const duplicateUser = {
    name: 'Pompeu',
    email: 'pompeulimp@gmail2.com',
    password: '12345',
  }

  describe('when /post in /users', () => {

    before(() => User
      .destroy({ where: {} }))

    it('should be create an user', done => {

      request(app)
        .post('/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.id).to.exist
          expect(res.body.name).to.equal(user.name)
          done()
        })
    })

    it('should be create an user with a encripted password', done => {

      request(app)
        .post('/users')
        .send(duplicateUser)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.password).not.equal(user.password)
          done()
        })
    })

    it('should be not create an user with duplicate email', done => {
      const user = {
        name: 'Pompeu',
        email: 'pompeulimp@gmail2.com',
        password: '12345',
      }

      request(app)
        .post('/users')
        .send(duplicateUser)
        .expect('Content-Type', /json/)
        .expect(406)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.error).equal('email must be unique')
          done()
        })
    })

  })


  describe('Whe User login in api', () => {
    it('should be exist route /users/login', done => {
      request(app)
        .post('/users/login')
        .send({email: user.email, password: user.password})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.token).to.be.exist
          done()
        })

    })
  })
})
