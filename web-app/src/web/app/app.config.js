/**
 * Configuration
 */

import environment from './_environment';

export default (app) => {

  switch (environment) {

    case 'development':

      app.constant('athletes_endpoint', '/resources/athletes.json');
      app.constant('activities_endpoint', '/resources/activities.json');
      app.constant('teams_endpoint', '/resources/teams.csv');

      break;

    default:

      app.constant('athletes_endpoint', '/resources/athletes.json');
      app.constant('activities_endpoint', '/resources/activities.json');
      app.constant('teams_endpoint', '/resources/teams.csv');

  }

  // <editor-fold desc="material theming" defaultstate="collapsed">
  app.config(/* @ngInject */ ($mdThemingProvider) => {
  });
  // </editor-fold>

};
