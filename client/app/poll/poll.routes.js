'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state('poll', {
      url: '/poll/:pollName',
      template: '<poll></poll>'
    });
}
