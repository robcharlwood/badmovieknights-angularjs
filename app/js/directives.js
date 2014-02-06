'use strict';

/* Bad movie knights Directives */
angular.module('badMovieKnights.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
