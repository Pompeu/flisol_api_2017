'use strict'

const request = require('supertest')
const expect = require('chai').expect
const app = require('../../app')

// const User = require('../../models/user')
const Post = require('../../models/post')

describe('Post api module', () => {
  /* const user = {
    name: 'Pompeu',
    email: 'pompeulimp@gmail.com',
    password: '12345',
  }*/

  let post = {
    id: 0,
    title : 'new post',
    body: 'this a new post'
  }

  describe('when :post in /posts', () => {

    before(() => Post
      .destroy({ where: {} }))

    it('should be create a new post', done => {

      request(app)
        .post('/posts')
        .send(post)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.id).to.exist
          expect(res.body.title).to.equal(post.title)
          expect(res.body.body).to.equal(post.body)
          post.id = res.body.id
          done()
        })
    })

    it('should be get one post by id', done => {

      request(app)
        .get(`/posts/${post.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body.id).to.equal(post.id)
          expect(res.body.title).to.equal(post.title)
          expect(res.body.body).to.equal(post.body)
          done()
        })
    })

    it('should be get all posts', done => {
      request(app)
        .get('/posts/')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body).to.be.an.array
          const firstPost = res.body
          expect(firstPost.id).to.equal(post.id)
          expect(firstPost.title).to.equal(post.title)
          expect(firstPost.body).to.equal(post.body)
          done()
        })
    })

    it('should be update a sigle post by id', done => {
      const updatedPost = {
        title: 'new post updated',
        body: 'new body of update post'
      }

      request(app)
        .put(`/posts/${post.id}`)
        .send(updatedPost)
        .expect('Content-Type', /json/)
        .expect(202)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body[0]).to.equal(1)
          done()
        })
    })

    it('should be delete a post by id', done => {
      request(app)
        .del(`/posts/${post.id}`)
        .expect(204)
        .end((err, res) => {
          expect(err).to.not.exist
          expect(res.body).to.be.an.object
          done()
        })
    })

  })
})
