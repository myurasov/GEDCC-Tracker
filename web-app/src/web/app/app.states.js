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
          templateUrl: 'app/views/screen.main.html',
          controller: ScreenMainController
        }
      }
    });

};
