'use strict';

/* Bad movie knights Directives */
angular.module('BadMovieKnights.directives', [])

  // directive to show app version info
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  // directive to hide & show the loading bar whilst views are loading
  .directive('pendingBar', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');
                $rootScope.$on('$routeChangeStart', function () {
                    element.removeClass('hide');
                });
                $rootScope.$on('$routeChangeSuccess', function () {
                    element.addClass('hide');
                });
                $rootScope.$on('$routeChangeError', function () {
                    element.removeClass('hide');
                });
            }
        };
    }
  ])

  // directive to hide and show the view based on route changes
  .directive('viewState', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                $rootScope.$on('$routeChangeStart', function () {
                    element.addClass('hide');
                });
                $rootScope.$on('$routeChangeSuccess', function () {
                    element.removeClass('hide');
                });
                $rootScope.$on('$routeChangeError', function () {
                    element.addClass('hide');
                });
            }
        };
    }
  ]);
