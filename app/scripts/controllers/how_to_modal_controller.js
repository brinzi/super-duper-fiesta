/**
 * Created by Brinzoiu on 6/1/2016.
 */
angular.module('oaseApp')
  .controller('HowToModalController', function ($scope, $uibModalInstance ) {

    $scope.ok = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
