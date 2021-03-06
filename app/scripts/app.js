'use strict';

/**
 * @ngdoc overview
 * @name oaseApp
 * @description
 * # oaseApp
 *
 * Main module of the application.
 */
var app = angular
  .module('oaseApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngStorage',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'jkuri.datepicker',
    'angularCSS',
    'duScroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        css:'/styles/generated.css'
      })
      .when('/login/:a', {
        templateUrl: 'views/about.html',
        controller: 'ResetPwdController',
        controllerAs: 'ResetCtrl',
        css:'/styles/generated.css'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        css:'/styles/main.css'
      })
      .when('views/register.html', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
