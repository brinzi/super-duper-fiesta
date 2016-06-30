'use strict';

/**
 * @ngdoc function
 * @name oaseApp.controller:AboutCtrl
 * @description
 * # ModalInstaceCOntroller
 * Controller of the oaseApp
 */

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('oaseApp')
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, fileUpload, $uibModal) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
    $scope.uploadFile = function () {

      var file = fileToLoad;
      var uploadUrl = "http://localhost:8080/UploadImage";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    $scope.ok = function () {
      if(interestPoints.length < 10){
        alert("Please mark all points")
        return;
      }
      $scope.uploadFile();
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    var openModal = function (size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: '../../views/howto.html',
        controller: 'HowToModalController',
        size: size,
        windowClass: 'app-howto-window',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {

      });
    };
    angular.element(document).ready(function () {

      ImageLoad();
      openModal('sm');
    });
  });
