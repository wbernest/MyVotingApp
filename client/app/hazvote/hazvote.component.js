'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './hazvote.routes';
import _ from 'lodash';

export class HazvoteComponent {
  /*@ngInject*/
  constructor($http, Auth, $state) {
    this.$http = $http;
    this.voteName = '';
    this.voteOptions = [];
    this.user = '';
    this.$state = $state;
    Auth.getCurrentUser().then( x => this.user = x.email);
  }

  addOption(){
    this.voteOptions.push({name: '', count: 0});
  }

  submit(){
    this.$http.get('/api/votes/' + this.voteName).then(response => {
      if(response.data.length != 0) alert(this.voteName + " already exists, please choose another name");
      else{
        this.$http.post('/api/votes', {
          name: this.voteName,
          options: this.voteOptions,
          user: this.user
        }).then(x => this.$state.go('poll', {pollName: this.voteName}));    
      }
    });

  }

  canSubmit(){
    if(this.voteName.length == 0)
      return true;
    if(this.voteOptions.length == 0)
      return true;
    if(this.user.length == 0)
      return true;

    var flag = false;
    _.each(this.voteOptions, function(o,i){
      if(o.name.length == 0){
        flag = true;
        return false;
      } 
    });
    return flag;
  }
}

export default angular.module('myVotingAppApp.hazvote', [uiRouter])
  .config(routes)
  .component('hazvote', {
    template: require('./hazvote.html'),
    controller: HazvoteComponent,
    controllerAs: 'hazvoteCtrl'
  })
  .name;
