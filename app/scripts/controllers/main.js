'use strict';

/**
 * @ngdoc function
 * @name oaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oaseApp
 */
angular.module('oaseApp')
  .controller('MainCtrl', function ($scope,$uibModal,$sessionStorage,$log, processLogin, xmlService,$location) {
    $scope.reports = [];


    $scope.getRaport = function(c) {
      var conditions =  xmlService.getXMLReports().Diagnostics.Condition;
      $scope.reports.push({
        "title": conditions[c].Title['#text'],
        "timestamp": new Date(),
        "recommendation": conditions[c].Recomandation['#text'],
        "content": conditions[c].Text['#text']
      });
    }

    $scope.getAllReports = function() {
         console.log($scope.user.diagnosticList[0]);
         for(var i = 0 ; i<$scope.user.diagnosticList.length ;i++)
          $scope.getRaport($scope.user.diagnosticList[i]);

    }

    $scope.setUserSession = function () {

      if( $scope.user != null  ){
        $scope.topBarText1 = "Welcome "+$scope.user.name;
        $scope.topBarText2 = "LogOut";
      } else {
        $scope.topBarText1 = "Register";
        $scope.topBarText2 = "Login";
      }

    }

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
        windowClass: 'app-modal-window',
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
      $scope.getRaport(result);
    })

    $scope.registerStart = function () {
      processLogin.redirected = true;
      $location.path('/login');
    };

    function init(){
      if($sessionStorage.user != null) {
        $scope.user = $sessionStorage.user;
        console.log($scope.user);
        $scope.getAllReports();
      }
      $scope.setUserSession();
      document.getElementById('patient-reports').style.display = 'block';
    }
    $scope.$on('$viewContentLoaded', function(){
      init();
    });


  });

