/**
 * Main screen controller
 * @author Mikhail Yurasov <me@yurasov.me>
 */

export default /* @ngInject */ ($scope, DataRepository) => {

  DataRepository.getTop()
    .then(v => {
      $scope.athletesTop = v.athletes;
      $scope.updatedAt = DataRepository.getUpdatedAt();
      $scope.$digest();
    })

}
