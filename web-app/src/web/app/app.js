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

// define app module
const app = angular.module('app', [
  'ui.router',
  'ngMaterial',
  templatesModule.name
]);

// config
config(app);

// states
app.config(states);

// filters
filters(app);

// bootstrap app
angular
  .element(document)
  .ready(function () {
    angular.bootstrap(document, [app.name]);
  });

export default app;
