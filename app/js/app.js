'use strict';

// Declare blog module which depends on filters, and services
angular.module(
  'BadMovieKnights', [
      'ngRoute',
      'ngCookies',
      'ngSanitize',
      'ui.bootstrap',
      'angularFileUpload',
      'angular-underscore',
      'pascalprecht.translate',
      'infinite-scroll',
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
.run(function ($cookieStore, $rootScope, $http, $translate, AuthenticationService, $location) {

    // language restoration based on cookie
    // TODO - Move this into a service
    if ($cookieStore.get('NG_TRANSLATE_LANG_KEY')) {
      $http.defaults.headers.common['Accept-Language'] = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
    }

    // handle login malarky
    var routesThatRequireAuth = ['/admin',];

    // check if current location matches route
    var routeClean = function (route) {
      return _.find(routesThatRequireAuth,
        function (noAuthRoute) {
          return _.str.startsWith(route, noAuthRoute);
        });
    };

    // if we are accessing a protected area and we are not logged in,
    // then redirect to login
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      var loggedIn = AuthenticationService.isLoggedIn();
      if (routeClean($location.url()) && !loggedIn) {
        $location.path('/login');
      }
    });
})

// setup routes
.config(['$routeProvider', function($routeProvider) {

  // entry list view
  $routeProvider.when("/", {
      templateUrl: "partials/blog.html",
      controller: "BlogController",
      resolve: {
          entries: function ($http, EntryService, AuthenticationService) {
              // if we are logged in, we want to access this view with
              // the read only serializer - so remove the token header
              if (AuthenticationService.isLoggedIn()){
                delete $http.defaults.headers.common["Authorization"];
              }
              return EntryService.list(1);
          }
      }
  });

  // entry view
  $routeProvider.when("/entry/:id", {
      templateUrl: "partials/entry.html",
      controller: "BlogEntryController",
      resolve: {
          entry: function ($http, $route, EntryService, AuthenticationService) {
              // if we are logged in, we want to access this view with
              // the read only serializer - so remove the token header
              if (AuthenticationService.isLoggedIn()){
                delete $http.defaults.headers.common["Authorization"];
              }
              var entryId = $route.current.params.id
              return EntryService.get(entryId);
          }
      }
  });

  // create entry admin view
  $routeProvider.when("/admin/entry/create", {
      templateUrl: "partials/create_entry.html",
      controller: "BlogCreateEntryController"
  });

  // entry admin view
  $routeProvider.when("/admin/entry/:id", {
      templateUrl: "partials/edit_entry.html",
      controller: "BlogEditEntryController",
      resolve: {
          entry: function ($route, EntryService) {
              var entry_id = $route.current.params.id
              return EntryService.get(entry_id);
          },
          translations: function ($route, EntryTranslationService) {
              var entry_id = $route.current.params.id
              return EntryTranslationService.list(entry_id);
          }
      }
  });

  // create entry translation view
  $routeProvider.when("/admin/entry/:id/translations/create", {
      templateUrl: "partials/create_entry_translation.html",
      controller: "BlogCreateEntryTranslationController",
      resolve: {
          entry_id: function ($route, EntryService) {
              var entry_id = $route.current.params.id
              return entry_id
          }
      }
  });

  // entry translation view
  $routeProvider.when("/admin/entry/:entry_id/translations/:trans_id", {
      templateUrl: "partials/edit_entry_translation.html",
      controller: "BlogEditEntryTranslationController",
      resolve: {
          entry_id: function ($route) {
              var entry_id = $route.current.params.entry_id;
              return entry_id;
          },
          translation: function ($route, EntryTranslationService) {
              var trans_id = $route.current.params.trans_id;
              var entry_id = $route.current.params.entry_id;
              return EntryTranslationService.get(entry_id, trans_id);
          }
      }
  });

  // login view
  $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
  });

  // logout view
  $routeProvider.when('/logout', {
      template: ' ',
      controller: 'LogoutController'
  });

  // any other route should redirect to the home page
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

// configure the hash bang for disqus compatibility
.config(['$locationProvider', function($locationProvider){
  $locationProvider.hashPrefix('!')
}])

// setup auth 401 interceptor
.config(['$httpProvider', function($httpProvider) {
  var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
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
