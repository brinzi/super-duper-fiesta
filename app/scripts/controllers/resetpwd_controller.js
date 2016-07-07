angular.module('oaseApp')
  .controller('ResetPwdController', function ($scope,  $routeParams) {

    $scope.$on('$viewContentLoaded', function() {
      console.log($routeParams.a);
    });
  });
