'use strict'

const expect = require('chai').expect
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

describe('Model User', () => {
  describe('atribuls verify', () => {
    const user = {
      name: 'Pompeu',
      email: 'pompeulimp@gmial.com',
      password: '12345'
    }

    before(() => User
      .destroy({ where: {} }))

    it('should be exist', () => {
      expect(User).to.exist
    })

    it('should be use has name, email, password', () => {
      return User
        .create(user)
        .then(newUser => {
          expect(newUser.get('name')).to.equal(user.name)
          expect(newUser.get('email')).to.equal(user.email)
          expect(newUser.get('password')).not.equal(user.email)
        })
    })

    it('should be exist login method', () => {
      expect(User.login).to.exist
    })

    it('should be login method return a user data witiout password', () => {
      return User.login(user)
        .then(token => {
          const decoded = jwt.verify(token, 'secret')
          expect(decoded.data.name).to.equal(user.name)
          expect(decoded.data.email).to.equal(user.email)
          expect(decoded.data.password).not.exist

        })
    })

  })
})
