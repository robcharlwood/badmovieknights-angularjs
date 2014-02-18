'use strict';

/* Bad movie knights AngularJS Controllers */
angular.module('BadMovieKnights.controllers', [])

  // l10n controller
  .controller('L10nController', ['$scope', '$http', '$translate', function($scope, $http, $translate){
    $scope.setLang = function(langKey) {
        $translate.use(langKey);
        $http.defaults.headers.common['Accept-Language'] = langKey
    };
  }])

  // Blog controller
  .controller('BlogController', ['$scope', 'entries', function($scope, entries) {
    $scope.entries = entries;
  }])

  // blog entry controller
  .controller('BlogEntryController', ['$scope', 'entry', function($scope, entry) {
    $scope.entry = entry;
  }])

  // login controller
  .controller('LoginController', ['$scope', 'AuthenticationService', function($scope, AuthenticationService) {
    $scope.loginUser = function() {
      AuthenticationService.login({username: 'robcharlwood', password: 'password123'});
    };
  }]);
