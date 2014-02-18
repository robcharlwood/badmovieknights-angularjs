'use strict';

// Declare blog module which depends on filters, and services
angular.module(
  'BadMovieKnights', [
      'ngRoute',
      'ngCookies',
      'ngSanitize',
      'ui.bootstrap',
      'angular-underscore',
      'pascalprecht.translate',
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
.run(function ($cookieStore, $rootScope, $http, $translate, AuthenticationService, SessionService, $location) {

    // language restoration based on cookie
    if ($cookieStore.get('NG_TRANSLATE_LANG_KEY')) {
      $http.defaults.headers.common['Accept-Language'] = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
    }

    // handle login malarky
    var routesThatRequireAuth = ['/entry/1',];

    // check if current location matches route
    var routeClean = function (route) {
      return _.find(routesThatRequireAuth,
        function (noAuthRoute) {
          return _.str.startsWith(route, noAuthRoute);
        });
    };

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
        $location.path('/login');
      }
    });
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
  $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
  });
  $routeProvider.otherwise({redirectTo: '/'});
}])

// configure translations
.config(['$translateProvider', function($translateProvider) {

  // load in translations - don't like the translations inline
  $translateProvider.useStaticFilesLoader({
    prefix: 'l10n/',
    suffix: '.json'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');

  // Tell the module to store the language in the cookies
  $translateProvider.useCookieStorage();

}])

// setup auth 401 interceptor
.config(['$httpProvider', function($httpProvider) {
  var logsOutUserOn401 = ['$q', '$location', 'SessionService', function ($q, $location, SessionService) {
    var success = function (response) {
      return response;
    };

    var error = function (response) {
      if (response.status === 401) {
        $location.path('/login');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    };

    return function (promise) {
      return promise.then(success, error);
    };
  }];

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
}]);
