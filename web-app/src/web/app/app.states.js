/**
 * App states
 */

// configure states
export default /* @ngInject */ ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('main', {
      url: '/',
      views: {
        'screen': {
          templateUrl: 'app/views/screen.main.html',
          controller: /* @ngInject */ ($scope) => {
            $scope.abc = 123;
          }
        }
      }
    });

};
