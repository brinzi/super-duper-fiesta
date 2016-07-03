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

    var removeImage = function () {
      var imageHolder = document.getElementById("current_image");
      var drawArea = document.getElementById("modal-body");
      drawArea.removeChild(imageHolder);
    };

    $scope.uploadFile = function () {

      var file = fileToLoad;
      var uploadUrl = "http://localhost:8080/UploadImage";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    $scope.ok = function () {
      if(interestPoints.length < 8){
        alert("Please mark all points")
        return;
      }
      $scope.uploadFile();
      $uibModalInstance.close($scope.selected.item);
      document.getElementById('image-form').reset();

    };

    $scope.cancel = function () {
      document.getElementById('image-form').reset();
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
