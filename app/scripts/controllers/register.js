'use strict';

/**
 * @ngdoc function
 * @name homeControlApp.controller:LoginCtrl
 * @description
 * # RegisterController
 * Controller of the homeControlApp
 */
angular.module('oaseApp')
  .controller('RegisterCtrl', function ($scope,$filter, $location, $cookies, $uibModalInstance, items, processRegister ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.invalidLogin = false;

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };


    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


    $scope.doRegister = function () {
      $cookies.url = 'http://localhost:8080'
      $scope.birthDate = $filter('date')( $scope.birthDate,'dd-MM-yyyy');
      var register = processRegister.process($scope.name, $scope.surname , $scope.password, $scope.birthDate ,  $scope.user_email);
      register.then(function (result) {
        $uibModalInstance.close($scope.selected.item);
      });
    };


  });

