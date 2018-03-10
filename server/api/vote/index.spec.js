'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var voteCtrlStub = {
  index: 'voteCtrl.index',
  show: 'voteCtrl.show',
  create: 'voteCtrl.create',
  upsert: 'voteCtrl.upsert',
  patch: 'voteCtrl.patch',
  destroy: 'voteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var voteIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './vote.controller': voteCtrlStub
});

describe('vote API Router:', function() {
  it('should return an express router instance', function() {
    expect(voteIndex).to.equal(routerStub);
  });

  describe('GET /api/votes', function() {
    it('should route to vote.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'voteCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/votes/:id', function() {
    it('should route to vote.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'voteCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/votes', function() {
    it('should route to vote.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'voteCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/votes/:id', function() {
    it('should route to vote.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'voteCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/votes/:id', function() {
    it('should route to vote.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'voteCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/votes/:id', function() {
    it('should route to vote.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'voteCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
