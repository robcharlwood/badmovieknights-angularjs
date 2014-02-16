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
});
