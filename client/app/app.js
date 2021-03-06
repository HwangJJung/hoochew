'use strict';

angular.module('angularFullstackApp', [
  'angularFullstackApp.auth',
  'angularFullstackApp.admin',
  'angularFullstackApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'restangular'
])
  .config(function($urlRouterProvider, $locationProvider,RestangularProvider) {
    $urlRouterProvider
      .otherwise('/');
    RestangularProvider.setBaseUrl('/api/');
    $locationProvider.html5Mode(true);
  });
