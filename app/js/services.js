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
        delete: function (entry_id) {
            var url = api_url + entry_id + "/";
            var defer = $q.defer();
            $http({method: 'DELETE', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        list: function (page) {
            var defer = $q.defer();
            $http({method: 'GET', url: api_url + '?page=' + page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data.results);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        update: function (entry) {
            var url = api_url + entry.id + "/";
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: entry}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
            return defer.promise;
        },
        create: function (entry) {
            var defer = $q.defer();
            $http({method: 'POST',
                url: api_url,
                data: entry}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
            return defer.promise;
        },
    }
  })

  // entry service
  .factory('EntryTranslationService', function ($http, $q) {
    var api_url = "http://localhost:8080/api/entry/";
    return {
        get: function (entry_id, trans_id) {
            var url = api_url + entry_id + "/translations/" + trans_id + '/';
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
        delete: function (entry_id, trans_id) {
            var url = api_url + entry_id + "/translations/" + trans_id + '/';
            var defer = $q.defer();
            $http({method: 'DELETE', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        list: function (entry_id) {
            var url = api_url + entry_id + "/translations/"
            var defer = $q.defer();
            $http({method: 'GET', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        update: function (entry_id, translation) {
            var url = api_url + entry_id + "/translations/" + translation.id + '/';
            var defer = $q.defer();
            $http({
                method: 'PUT',
                url: url,
                data: translation}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
            return defer.promise;
        },
        create: function (entry_id, translation) {
            var url = api_url + entry_id + "/translations/"
            var defer = $q.defer();
            $http({method: 'POST',
                url: url,
                data: translation}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(data);
                });
            return defer.promise;
        },
    }
  })

  // authentication service
  .factory('AuthenticationService', function ($http, $q, SessionService, $cookieStore) {
      return {

        // login api call - uses promises to return error messages to the controller
        login: function (user) {
          var deferred = $q.defer();
          $http.post("http://localhost:8080/api/auth/token/", user)

              // on success, set the cookie and http headers
              .success(function(response) {
                  $cookieStore.put('djangotoken', response.token);
                  $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                  SessionService.currentUser = response.token;
                  deferred.resolve()
              })

              // on error, return the response which contain error message
              .error(function(response) {
                  deferred.reject(response);
              });

          // return the final promise
          return deferred.promise;
        },

        // method to logout a user - as we are using token based sessions,
        // there is no api call required. Simply remove the cookie and kill
        // the authorization header
        logout: function () {
          if ($cookieStore.get('djangotoken')) {
                delete $http.defaults.headers.common["Authorization"];
                $cookieStore.remove('djangotoken');
          };
          SessionService.currentUser = null
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

  // session service - keeps track of user
  .factory('SessionService', function () {
      return {
        currentUser: null
      };
  });
