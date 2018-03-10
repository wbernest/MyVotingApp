import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  topVotes = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.Auth = Auth;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('vote');
    });
  }

  $onInit() {
    this.$http.get('/api/votes')
      .then(response => {
        this.topVotes = response.data;
        this.socket.syncUpdates('vote', this.topVotes);
      });
  }

  addVote() {
    if(this.newVote) {
      this.$http.post('/api/votes', {
        name: this.newVote
      });
      this.newVote = '';
    }
  }

  deleteVote(vote) {
    this.$http.delete(`/api/votes/${vote._id}`);
  }

  hideButton(){
    return this.Auth.isLoggedInSync();
  }
}

export default angular.module('myVotingAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
