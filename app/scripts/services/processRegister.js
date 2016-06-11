/**
 * Created by Brinzoiu on 4/5/2016.
 */
'use strict';

/**
 * @ngdoc service
 * @name oaseApp.login
 * @description
 * # login
 * Service in the homeControlApp.
 */
angular.module('oaseApp')
  .service('processRegister', function ($http, $cookies) {
    var process = function (name ,surname, password, birthDate, user_email) {

      return $http({
        method : 'POST',
        url : $cookies.url + '/Register',
        contentType:'application/json',
        data : {
          name: name,
          surname: surname,
          password: password,
          birthDate: birthDate,
          email: user_email

        }
      }).
      then(function (result) {
        return result;
      });
    };
    return {process: process};
  });

