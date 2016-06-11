/**
 * Created by Brinzoiu on 4/14/2016.
 */
angular.module('oaseApp')
  .service('fileUpload', ['$http', '$rootScope', function ($http, $rootScope) {
    var uploadFileToUrl = function (file, uploadUrl) {
      var fd = new FormData();
      interestPoints = JSON.stringify(interestPoints);
      console.log(interestPoints);
      fd.append('file', file);
      fd.append('points', interestPoints);
      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        })
        .success(function (data) {

          var values="";
          for(var key in data) {
            console.log(data[key]);
            values += data[key].toString()+"\n";
            console.log(values);
          }
          $rootScope.$broadcast('eventFired', values);
        })
        .error(function () {
        });

    }
    return {uploadFileToUrl : uploadFileToUrl};
  }]);
