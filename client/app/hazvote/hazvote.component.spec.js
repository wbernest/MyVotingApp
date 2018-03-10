'use strict';

describe('Component: HazvoteComponent', function() {
  // load the controller's module
  beforeEach(module('myVotingAppApp.hazvote'));

  var HazvoteComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    HazvoteComponent = $componentController('hazvote', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
