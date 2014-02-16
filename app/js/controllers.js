'use strict';

/* Bad movie knights AngularJS Controllers */
angular.module('BadMovieKnights.controllers', []).

  // Blog controller
  controller('BlogController', ['$scope', 'entries', function($scope, entries) {
    $scope.entries = entries;
  }])

  // blog entry controller
  .controller('BlogEntryController', ['$scope', 'entry', function($scope, entry) {
    $scope.entry = entry;
  }]);
