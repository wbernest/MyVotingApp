import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import $ from 'jquery';
export class MainController {
  topVotes = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope,  Auth) {
    'ngInject'
    this.$http = $http;
    this.Auth = Auth;
    this.user = "";
    this.height = window.innerHeight - 360 - 70;
    Auth.getCurrentUser().then( x => {
      this.user = x.email;
      this.$http.get('/api/votes').then(response => {
        if(this.user == "") this.topVotes = response.data;
        else{
          this.topVotes = response.data.filter(x => x.user != this.user);
          this.myVotes = response.data.filter(x => x.user == this.user);
        }
      });

    });
  }
}

export default angular.module('myVotingAppApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;