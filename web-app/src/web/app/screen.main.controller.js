/**
 * Main screen controller
 * @author Mikhail Yurasov <me@yurasov.me>
 */

export default /* @ngInject */ ($scope, DataRepository, $timeout, $state) => {

  $scope.$state = $state;

  /**
   * Refresh data
   */
  function refresh() {
    DataRepository.getTop()
      .then(v => {
        $scope.athletesTop = v.athletes;
        $scope.teamsTop = v.teams;
        $scope.$parent.updatedAt = DataRepository.getUpdatedAt();
        $scope.$digest();
      });

    // repeat in 1..2 minutes
    $timeout(refresh, 60000 + Math.random() * 60000);
  }

  refresh();
}
