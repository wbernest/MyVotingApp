'use strict';

export default function routes($stateProvider) {
  'ngInject';
  $stateProvider.state('hazvote', {
    url: '/hazvote',
    template: '<hazvote></hazvote>'
  });
}
