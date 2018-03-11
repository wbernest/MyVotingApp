import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './poll.routes';
import _ from 'lodash';
import Chart from 'chart.js'

export class PollComponent {
  /*@ngInject*/
  constructor($scope, $http, Auth, $state) {
    'ngInject'
    this.$http = $http;
    this.pollName = $scope.$parent.pollName;
    this.poll;
    this.user = '';
    this.optionCounter;
    this.chart = null;
    this.$state = $state;

    Auth.getCurrentUser().then( x => this.user = x.email);
    $http.get('/api/votes/'+this.pollName).then(x => {
      this.poll = x.data[0];
      this.createChart();
    });

  }

  addOption(){
    var newOption = prompt("Enter a new option:", "");
    if(newOption.length == 0) alert("Option name can not be empty.") 
    else if(this.poll.options.map(x => x.name.toLowerCase()).indexOf(newOption.toLowerCase()) >= 0) alert("Option already exists.")
    else{
      this.poll.options.push({name: newOption, count: 0});
      this.$http.put('/api/votes/'+this.poll._id, this.poll).then(x => this.createChart());
    }
  }

  submit(){
    this.poll.options.find(x => x.name == this.optionCounter).count++;
    this.$http.put('/api/votes/'+this.poll._id, this.poll).then(x => this.createChart());
  }

  delete(){
    this.$http.delete('/api/votes/'+this.poll._id).then(x => this.$state.go('main'));
  }

  createChart(){
    if(this.chart != null) this.chart.destroy();
    this.chart = new Chart("mychart",{
      type: 'bar',
      data: {
          labels: this.poll.options.map(x => x.name),
          datasets: [{
              label: '# of Votes',
              data: this.poll.options.map(x => x.count),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        maintainAspectRatio: false,
        width: 400,
        height: 300,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
  })
  }

  canAddOption(){
    if(this.user.length == 0)
      return true;
  }

  canDeletePoll(){
    if(this.poll != undefined && this.user == this.poll.user)
      return true;
  }
}

export default angular.module('myVotingAppApp.poll', [uiRouter])
  .config(routes)
  .component('poll', {
    template: require('./poll.html'),
    controller: PollComponent,
    controllerAs: 'pollCtrl'
  })
  .name;
