'use strict';

/**
 * @ngdoc function
 * @name oaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oaseApp
 */
angular.module('oaseApp')
  .controller('MainCtrl', function ($cookies,$scope,$uibModal,$sessionStorage,$log, processLogin, xmlService,$location) {

  $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $cookies.url = 'http://localhost:8080';

    $scope.reports = [];
    $scope.clearSessionData = function (){
      $scope.reports = [];
      document.getElementById('patient-reports').style.display = 'none';

    };

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
         for(var i = 0 ; i<$scope.user.diagnosticList.length ;i++)
          $scope.getRaport($scope.user.diagnosticList[i]);

    }

    $scope.setUserSession = function () {
      $scope.user = $sessionStorage.user;

      if( $scope.user != null  ){
        $scope.topBarText1 = "Welcome "+$scope.user.name;
        $scope.topBarText2 = "LogOut";
        $scope.getAllReports();
        document.getElementById('patient-reports').style.display = 'block';
      } else {
        $scope.clearSessionData();
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

    $scope.logOut = function(){
      $sessionStorage.user = null;
      $scope.setUserSession();
    }

    $scope.sessionOperation = function () {
        if($scope.user != null )
          $scope.logOut();
         else
          $location.path('/login');
    }

    function init(){
      $scope.setUserSession();
    }
    $scope.$on('$viewContentLoaded', function(){
      init();
    });


  });

