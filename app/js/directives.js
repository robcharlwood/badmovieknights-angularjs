'use strict';

/* Bad movie knights Directives */
angular.module('BadMovieKnights.directives', [])

  // directive to show app version info
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  // auth application directive
  .directive('authApplication', function($cookieStore, $http, $rootScope) {
    return {
      restrict: 'A',
        link: function (scope, elem, attrs) {
          var login = document.getElementById("login-holder");

          var applyLogin = function(good) {
            if (good) {
              login.style.display = "none";
            } else {
              login.style.display = "block";
            }
          }

          scope.$on('event:auth-loginRequired', function () {
            applyLogin(false)
          });

          scope.$on('event:auth-loginConfirmed', function () {
            applyLogin(true);
          });

        }
    }
  })

  // login form directive
  .directive('login', function($http, $cookieStore, authService) {
    return {
      restrict: 'A',
      template: " <form> " +
                  "<label>Username</label>" +
                  "<input type='text' ng-model='username'>" +
                  "<label>Password</label>" +
                  "<input type='password' ng-model='password'>" +
                  "<br>" +
                  "<input type='submit'>" +
              "</form>",
      link: function(scope, elem, attrs) {

        elem.bind('submit', function() {

          var user_data = {
              "username": scope.username,
              "password": scope.password,
          };

          $http.post("http://localhost:8080/api/auth/token/", user_data)
              .success(function(response) {
                $cookieStore.put('djangotoken', response.token);
                  $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                  authService.loginConfirmed();
          });

        });

      }
    }
  })

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
