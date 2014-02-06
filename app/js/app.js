'use strict';

// Declare blog module which depends on filters, and services
angular.module('BadMovieKnights', [
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'BadMovieKnights.filters',
    'BadMovieKnights.services',
    'BadMovieKnights.directives',
    'BadMovieKnights.controllers'
  ], function($interpolateProvider){

        // update template start and end tags so that we can use
        // angularjs with django
        $interpolateProvider.startSymbol("{$$");
        $interpolateProvider.endSymbol("$$}");
  }
)

// setup csrf token
.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
})

// setup routes
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/blog.html', controller: 'BlogController'});
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
