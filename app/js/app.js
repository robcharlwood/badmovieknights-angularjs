'use strict';

// Declare blog module which depends on filters, and services
angular.module(
  'BadMovieKnights', [
      'http-auth-interceptor',
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

// check for token authentication or show login form
.run(function ($cookieStore, $rootScope, $http) {
    if ($cookieStore.get('djangotoken')) {
      $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
      //document.getElementById("welcome").style.display = "block";
      document.getElementById("login-holder").style.display = "none";
    } else {
      document.getElementById("login-holder").style.display = "block";
    }
})

// setup routes
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/blog.html', controller: 'BlogController'});
  $routeProvider.when('/view2', {
    templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);
