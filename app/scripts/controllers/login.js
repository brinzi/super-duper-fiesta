'use strict';

/**
 * @ngdoc function
 * @name homeControlApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the homeControlApp
 */
angular.module('oaseApp')
  .controller('LoginCtrl', function ($scope, $location, $cookies, $window, $sessionStorage, processLogin, $timeout, $uibModal) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS'
      ];

      $scope.invalidLogin = false;

      $scope.items = ['register_modal'];
      $scope.animationsEnabled = true;

      $scope.openRegister = function (size) {
        var registerModalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/register.html',
          controller: 'RecoverPwdController',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });


        registerModalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
         // $log.info('Modal dismissed at: ' + new Date());
        });
      };

    $scope.openPwdRecover = function (size) {
      var registerModalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/pwd_recover.html',
        controller: 'RegisterCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });


      registerModalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });
    };


      $scope.doLogin = function () {
        $cookies.url = 'http://localhost:8080'

        var login = processLogin.process($scope.user_email, $scope.password);
        login.then(function (result) {
          if (result.status !== 200 ) {
            console.log("here");
            alert("Invalid username or password entered");
          } else {
            $sessionStorage.user = result.data;
            console.log($sessionStorage.user);

            $timeout(function () {
              $scope.$apply(function () {
                $location.path('/main');
              });
            });
          }
        });
      };

    $scope.$on('$viewContentLoaded', function(){
        if(processLogin.redirected)
          $scope.openRegister();
    });

    });
