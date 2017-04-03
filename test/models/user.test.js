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
      User.getJWT()
      return User
        .create(user)
        .then(newUser => {
          expect(newUser.get('name')).to.equal(user.name)
          expect(newUser.get('email')).to.equal(user.email)
          expect(newUser.get('password')).not.equal(user.email)
        })
    })

    it('should be exist getJWT method', () => {
      expect(User.getJWT).to.exist;
    })

    it('should be getJWT return a JWT valid by user', () => {
      const user = {name: 'pompeu', email: 'pompeulimp@gmail.com'};
      return User.getJWT(user)
        .then(token => {
          expect(jwt).to.exist
          const decoded = jwt.verify(token, 'secret');
          expect(decoded.data.name).to.equal(user.name)
          expect(decoded.data.email).to.equal(user.email)
        })
    })


    it('should be exist login method', () => {
      expect(User.login).to.exist;
    })

    it('should be exist login method', () => {
      return User.login(user)
        .then(newUser => {
          expect(user.name).to.equal(newUser.name)
        })
    })

  })
})
