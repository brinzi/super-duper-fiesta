'use strict';

/**
 * @ngdoc service
 * @name oaseApp.login
 * @description
 * # login
 * Service in the homeControlApp.
 */
angular.module('oaseApp')
  .service('processLogin', function ($http, $cookies) {
    var process = function (email, password) {
      console.log(btoa(email + ":" + password));
      return $http({
        method : 'POST',
        url : $cookies.url + '/LogIn',
        contentType:'application/json',
        data : {
          email: email,
          password: password
        }
      }).
      then(function (result) {
        return result;
      });
    };
    return {process: process};
  });
