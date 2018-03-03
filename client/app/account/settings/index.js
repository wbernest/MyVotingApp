'use strict';

import angular from 'angular';
import SettingsController from './settings.controller';

export default angular.module('myVotingAppApp.settings', [])
  .controller('SettingsController', SettingsController)
  .name;
