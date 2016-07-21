/**
 * Main application file
 */

import 'jquery';
import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'lodash';

import states from './app.states';
import filters from './app.filters';
import config from './app.config';

import templatesModule from './_templates'; // cached templates
import DataRepository from './data.repository';

// define app module
const app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  templatesModule.name
]);

// config
config(app);

// filters
filters(app);

// states
app.config(states);

// services
app.service('DataRepository', DataRepository);

// bootstrap app
angular
  .element(document)
  .ready(() => angular.bootstrap(document, [app.name]));

export default app;
