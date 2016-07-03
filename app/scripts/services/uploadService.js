/**
 * Created by Brinzoiu on 4/14/2016.
 */
angular.module('oaseApp')
  .service('fileUpload', ['$http', '$rootScope', function ($http, $rootScope) {
    var uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      interestPoints = JSON.stringify(interestPoints);
      fd.append('file', file);
      fd.append('points', interestPoints);
      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success(function (data) {
          console.log(data);
          $rootScope.$broadcast('eventFired', data);
        })
        .error(function () {
        });

    }
    return {uploadFileToUrl : uploadFileToUrl};
  }]);
