'use strict';

/**
 * @ngdoc function
 * @name oaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oaseApp
 */
angular.module('oaseApp')
  .controller('MainCtrl', function ($scope,$uibModal,$sessionStorage,$log, processLogin,$location) {
    $scope.reports = [
      {
        "id": 1,
        "timestamp": new Date(),
        "recommendation": "Go to doctor.",
        "result":"Some result"
      },
      {
        "id": 2,
        "timestamp": new Date(),
        "recommendation": "Go to home.",
        "result":"Some other result"
      },
      {
        "id": 23,
        "timestamp": new Date(),
        "recommendation": "Go to home.",
        "result":"Some other result"
      }
    ];


    $scope.user ="Bogdan"; //$sessionStorage.user;
    if( $scope.user != null  )
    {
      $scope.topBarText1 = "Welcome "+$scope.user+",";
      $scope.topBarText2 = "LogOut";
    }
    else
    {
      $scope.topBarText1 = "Register";
      $scope.topBarText2 = "Login";
    }

    $scope.selectedReport = -1;
    $scope.toggleReport = function (index) {
      if ($scope.selectedReport === index)
        $scope.selectedReport = -1;
      else
        $scope.selectedReport = index;
    };
    $scope.loadImage = function () {
      $scope.openModal('lg');
    };

    $scope.items = ['image_modal'];
    $scope.animationsEnabled = true;

    $scope.openModal = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/image_modal.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        windowClass: 'gruntapp-modal-window',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.$on('eventFired', function(event, result) {

      $scope.reports.push({
        "id": "some id",
        "timestamp": new Date(),
        "recommendation": "Go to doctor",
        "result": result
      });
    })

    $scope.registerStart = function () {
      processLogin.redirected = true;
      $location.path('/login');
      };
  });

