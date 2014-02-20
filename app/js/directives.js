'use strict';

/* Bad movie knights Directives */
angular.module('BadMovieKnights.directives', [])

  // directive to show app version info
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  .directive('dirDisqus', function($window) {
    return {
        restrict: 'E',
        scope: {
            disqus_shortname: '@disqusShortname',
            disqus_identifier: '@disqusIdentifier',
            disqus_title: '@disqusTitle',
            disqus_url: '@disqusUrl',
            disqus_category_id: '@disqusCategoryId',
            disqus_disable_mobile: '@disqusDisableMobile',
            readyToBind: "@"
        },
        template: '<div id="disqus_thread"></div><a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>',
        link: function(scope) {

            scope.$watch("readyToBind", function(isReady) {

                // If the directive has been called without the 'ready-to-bind' attribute, we
                // set the default to "true" so that Disqus will be loaded straight away.
                if ( !angular.isDefined( isReady ) ) {
                    isReady = "true";
                }
                if (scope.$eval(isReady)) {
                    // put the config variables into separate global vars so that the Disqus script can see them
                    $window.disqus_shortname = scope.disqus_shortname;
                    $window.disqus_identifier = scope.disqus_identifier;
                    $window.disqus_title = scope.disqus_title;
                    $window.disqus_url = scope.disqus_url;
                    $window.disqus_category_id = scope.disqus_category_id;
                    $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                    // get the remote Disqus script and insert it into the DOM
                    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                    dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                }
            });
        }
    };
  })

  // directive which shows and hides the login/logout links based on current user state
  .directive('loginLogout', [
    '$rootScope', 'AuthenticationService', function(
        $rootScope, AuthenticationService) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {

          // grab the dom elements
          var login = document.getElementById("login-link");
          var logout = document.getElementById("logout-link");

          // create a function to toggle based on state
          var toggleLogin = function() {
            var loggedIn = AuthenticationService.isLoggedIn();
            if (loggedIn) {
              logout.style.display = "block";
              login.style.display = "none";
            } else {
              logout.style.display = "none";
              login.style.display = "block";
            }
          }

          // listen to route change so that we can check on each
          // url change
          scope.$on('$routeChangeStart', function () {
            toggleLogin();
          });
        }
    }
  }])

  // directive which shows and hides the edit buttons based on current user state
  .directive('editEnabled', [
    '$rootScope', 'AuthenticationService', function(
        $rootScope, AuthenticationService) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          var loggedIn = AuthenticationService.isLoggedIn();
          if (loggedIn) {
            elem.css('visibility', 'visible');
          } else {
            elem.css('visibility', 'hidden');
          }
      }
    }
  }])

  // directive which shows and hides the create button based on current user state
  .directive('createEnabled', [
    '$rootScope', 'AuthenticationService', function(
        $rootScope, AuthenticationService) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          var loggedIn = AuthenticationService.isLoggedIn();
          if (loggedIn) {
            elem.css('visibility', 'visible');
          } else {
            elem.css('visibility', 'hidden');
          }
      }
    }
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
