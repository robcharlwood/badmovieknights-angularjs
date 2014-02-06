'use strict';

/* Bad movie knights Filters */
angular.module('BadMovieKnights.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
