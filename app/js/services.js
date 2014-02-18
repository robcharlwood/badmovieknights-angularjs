'use strict';

/* Bad movie knights Services */

// Version service
angular.module('BadMovieKnights.services', [])

  // version service
  .value('version', '0.0.1')

  // entry service
  .factory('EntryService', function ($http, $q) {
    var api_url = "http://localhost:8080/api/entry/";
    return {
        get: function (entry_id) {
            var url = api_url + entry_id + "/";
            var defer = $q.defer();
            $http({method: 'GET', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        list: function () {
            var defer = $q.defer();
            $http({method: 'GET', url: api_url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
    }
  })

  // authentication service
  .factory('AuthenticationService', function ($http, SessionService, $cookieStore) {
      return {

        login: function (user) {
          // this method could be used to call the API and set the user instead of taking it in the function params
          $http.post("http://localhost:8080/api/auth/token/", user)
              .success(function(response) {
                $cookieStore.put('djangotoken', response.token);
                  $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                  SessionService.currentUser = response.token;
              });
        },

        isLoggedIn: function () {
            // check if we have a cookie stored for logged in user
            if ($cookieStore.get('djangotoken')) {
              $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
              SessionService.currentUser = $cookieStore.get('djangotoken');
            } else {
                SessionService.currentUser = null
            }
          return SessionService.currentUser !== null;
        }
      };
  })

  // session service
  .factory('SessionService', function () {
      return {
        currentUser: null
      };
  });
