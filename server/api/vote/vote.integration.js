'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newThing;

describe('Vote API:', function() {
  describe('GET /api/votes', function() {
    var votes;

    beforeEach(function(done) {
      request(app)
        .get('/api/votes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          votes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(votes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/votes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/votes')
        .send({
          name: 'New Vote',
          info: 'This is the brand new vote!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newThing = res.body;
          done();
        });
    });

    it('should respond with the newly created vote', function() {
      expect(newThing.name).to.equal('New Vote');
      expect(newThing.info).to.equal('This is the brand new vote!!!');
    });
  });

  describe('GET /api/votes/:id', function() {
    var vote;

    beforeEach(function(done) {
      request(app)
        .get(`/api/votes/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          vote = res.body;
          done();
        });
    });

    afterEach(function() {
      vote = {};
    });

    it('should respond with the requested vote', function() {
      expect(vote.name).to.equal('New Vote');
      expect(vote.info).to.equal('This is the brand new vote!!!');
    });
  });

  describe('PUT /api/votes/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put(`/api/votes/${newThing._id}`)
        .send({
          name: 'Updated Vote',
          info: 'This is the updated vote!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated vote', function() {
      expect(updatedThing.name).to.equal('Updated Vote');
      expect(updatedThing.info).to.equal('This is the updated vote!!!');
    });

    it('should respond with the updated vote on a subsequent GET', function(done) {
      request(app)
        .get(`/api/votes/${newThing._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let vote = res.body;

          expect(vote.name).to.equal('Updated Vote');
          expect(vote.info).to.equal('This is the updated vote!!!');

          done();
        });
    });
  });

  describe('PATCH /api/votes/:id', function() {
    var patchedThing;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/votes/${newThing._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Vote' },
          { op: 'replace', path: '/info', value: 'This is the patched vote!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedThing = {};
    });

    it('should respond with the patched vote', function() {
      expect(patchedThing.name).to.equal('Patched Vote');
      expect(patchedThing.info).to.equal('This is the patched vote!!!');
    });
  });

  describe('DELETE /api/votes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/votes/${newThing._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vote does not exist', function(done) {
      request(app)
        .delete(`/api/votes/${newThing._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
