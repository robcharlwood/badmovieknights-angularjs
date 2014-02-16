'use strict';

// Declare blog module which depends on filters, and services
angular.module(
  'BadMovieKnights', [
      'http-auth-interceptor',
      'ngRoute',
      'ngCookies',
      'ngSanitize',
      'ui.bootstrap',
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
.run(function ($cookieStore, $rootScope, $http, $translate) {

    // apply token and language to api calls if the relevant cookies are set
    if ($cookieStore.get('djangotoken')) {
      $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
      document.getElementById("login-holder").style.display = "none";
    }
    if ($cookieStore.get('NG_TRANSLATE_LANG_KEY')) {
      $http.defaults.headers.common['Accept-Language'] = $cookieStore.get('NG_TRANSLATE_LANG_KEY');
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

}]);
