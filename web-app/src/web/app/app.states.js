/**
 * App states
 * @author Mikhail Yurasov <me@yurasov.me>
 */

import ScreenMainController from './screen.main.controller';

// configure states
export default /* @ngInject */ ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('main', {
      url: '/',
      views: {
        'screen': {
          templateUrl: 'app/screen.main.html',
          controller: ScreenMainController
        },
        'content@main': {
          templateUrl: 'app/athletes.html'
        }
      }
    });

};
