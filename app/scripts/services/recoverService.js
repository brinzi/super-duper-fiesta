angular.module('oaseApp')
  .service('processRecover', function ($http, $cookies) {

    $cookies.url = 'http://localhost:8080';
    var process = function (user_email) {

      return $http({
        method : 'POST',
        url : $cookies.url + '/Recover',
        contentType:'application/json',
        data : {
          email: user_email
        }
      }).
      then(function (result) {
        return result;
      });
    };
    return {process: process};
  });
