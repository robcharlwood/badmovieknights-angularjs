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
      document.getElementById("login-holder").style.display = "none";
    }
})

// setup routes
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
      templateUrl: "partials/blog.html",
      controller: "BlogController",
      resolve: {
          entries: function (EntryService) {
              return EntryService.list();
          }
      }
  });
  $routeProvider.when("/entry/:id", {
      templateUrl: "partials/entry.html",
      controller: "BlogEntryController",
      resolve: {
          entry: function ($route, EntryService) {
              var entryId = $route.current.params.id
              return EntryService.get(entryId);
          }
      }
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);
