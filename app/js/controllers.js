'use strict';

/* Bad movie knights AngularJS Controllers */
angular.module('BadMovieKnights.controllers', [])

  // l10n controller
  .controller('L10nController', ['$scope', '$translate', function($scope, $translate){
    $scope.setLang = function(langKey) {
        $translate.use(langKey);
    };
  }])

  // Blog controller
  .controller('BlogController', ['$scope', 'entries', '$translate', function($scope, entries, $translate) {
    $scope.entries = entries;
  }])

  // blog entry controller
  .controller('BlogEntryController', ['$scope', 'entry', '$translate', function($scope, entry, $translate) {
    $scope.entry = entry;
  }]);
