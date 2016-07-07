/**
 * Created by Brinzoiu on 7/7/2016.
 */
angular.module('oaseApp')
  .controller('RecoverPwdController', function ($scope,$uibModal, $uibModalInstance, items, $routeParams) {
    $scope.invalidLogin = false;

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.doRegister = function () {
      
      var recover = processRecover.process($scope.user_email);
      register.then(function (result) {
        $uibModalInstance.close($scope.selected.item);
      });
      
    };
 
  });
