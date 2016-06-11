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
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, fileUpload) {

    angular.element(document).ready(function () {
     ImageLoad();
    });
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
  });
