/**
 * Configuration
 */

import environment from './_environment';

export default (app) => {

  switch (environment) {
    case 'development':
      break;

    default:
  }

  // <editor-fold desc="material theming" defaultstate="collapsed">
  app.config(/* @ngInject */ ($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('blue');
  });
  // </editor-fold>

};
