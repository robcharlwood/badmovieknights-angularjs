'use strict';


// Declare blog module which depends on filters, and services
angular.module('badMovieKnights', [
  'ngRoute',
  'badMovieKnights.filters',
  'badMovieKnights.services',
  'badMovieKnights.directives',
  'badMovieKnights.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/blog.html', controller: 'BlogController'});
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
