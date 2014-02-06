'use strict';

/* Bad movie knights Directives */
angular.module('BadMovieKnights.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
