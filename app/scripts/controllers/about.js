'use strict';

/**
 * @ngdoc function
 * @name oaseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the oaseApp
 */
angular.module('oaseApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
