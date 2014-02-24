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
  .controller('BlogController', ['$scope', 'EntryService', 'entries', function($scope, EntryService, entries) {
    $scope.entries = entries;
    $scope.page = 2;
    $scope.busy = false;
    $scope.infiniteScrollEntries = function(){
      if ($scope.busy) return;
      $scope.busy = true;
      EntryService.list($scope.page).then(
        function(data){
            for(var i=0; i < data.length; i++){
              $scope.entries.push(data[i]);
            }
            $scope.page = $scope.page + 1;
        });
      $scope.busy = false;
    };
  }])

  // blog entry controller
  .controller('BlogEntryController', ['$scope', 'entry', function($scope, entry) {
    $scope.entry = entry;
  }])

  // blog create entry controller
  .controller('BlogCreateEntryController', [
    '$scope', '$window', '$location', '$sce',
    'EntryService', function($scope, $window, $location, $sce, EntryService) {
    $scope.entry = {
      'title': '',
      'content': '',
      'published': false,
    }

    // markdown preview
    $scope.markdownToHtml = function() {
      $scope.html = $window.marked($scope.entry.content);
      $scope.PreviewHTML = $sce.trustAsHtml($scope.html);
    };

    // method to cancel the creating of a blog entry
    $scope.cancelCreate = function() {
      $location.path('/');
    };

    // method to handle form submission
    $scope.processCreateEntryForm = function() {

      // reset error messages
      $scope.errorTitle = '';
      $scope.errorContent = '';
      $scope.errorPublished = '';
      $scope.non_field_errors = '';

      // attempt the create
      EntryService.create($scope.entry).then(
        function(data){
            $location.path('/');
        },
        function(data){
          if (data.title) {
            $scope.errorTitle = data.title[0];
          }
          if (data.content) {
            $scope.errorContent = data.content[0];
          }
          if (data.published) {
            $scope.errorPublished = data.published[0];
          }
        }
      );
    };
  }])

  // blog edit entry controller
  .controller('BlogEditEntryController', [
    '$scope', '$window', '$location', '$sce', '$upload',
    'EntryService', 'entry', 'translations', function(
        $scope, $window, $location, $sce, $upload, EntryService, entry, translations) {
    $scope.entry = entry;
    $scope.translations = translations;

    // markdown preview
    $scope.markdownToHtml = function() {
      $scope.html = $window.marked($scope.entry.content);
      $scope.PreviewHTML = $sce.trustAsHtml($scope.html);
    };
    // run this on page load
    $scope.markdownToHtml();

    // method to cancel the editing of a blog entry
    $scope.cancelEdit = function() {
      $location.path('/entry/' + entry.id);
    };

    // method to handle entry delete
    $scope.deleteEntry = function() {
      // attempt the update
      EntryService.delete($scope.entry.id).then(
        function(data){
            $location.path('/');
        }
      );
    };

    // method to upload image
    // TODO - move this to the EntryService
    $scope.onFileSelect = function($files) {
      $scope.successImage = '';
      $scope.errorImage = '';
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        var api_url = "http://localhost:8080/api/entry/" + $scope.entry.id + '/';
        $scope.upload = $upload.upload({
          url: api_url,
          method: 'PUT',
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity,
          data: {'image': file},
          file: file,
        }).success(function(data, status, headers, config) {
            $scope.successImage = 'Upload successful!';
        }).error(function(data, status, headers, config) {
          if (data.image) {
            $scope.errorImage = data.image[0];
          }
        });
      }
    };

    // method to handle form submission
    $scope.processEntryForm = function() {

      // reset error messages
      $scope.errorTitle = '';
      $scope.errorContent = '';
      $scope.errorPublished = '';
      $scope.non_field_errors = '';

      // attempt the update
      EntryService.update($scope.entry).then(
        function(data){
            $location.path('/entry/' + entry.id);
        },
        function(data){
          if (data.title) {
            $scope.errorTitle = data.title[0];
          }
          if (data.content) {
            $scope.errorContent = data.content[0];
          }
        }
      );
    };
  }])

  // blog edit entry translation controller
  .controller('BlogEditEntryTranslationController', [
    '$scope', '$window', '$location', '$sce', 'EntryTranslationService',
    'entry_id', 'translation', function(
        $scope, $window, $location, $sce, EntryTranslationService,
        entry_id, translation) {
    $scope.translation = translation;
    $scope.entry_id = entry_id;

    // markdown preview
    $scope.markdownToHtml = function() {
      $scope.html = $window.marked($scope.translation.content);
      $scope.PreviewHTML = $sce.trustAsHtml($scope.html);
    };
    // run this on page load
    $scope.markdownToHtml();

    // method to cancel the editing of a blog entry translation
    $scope.cancelEdit = function() {
      $location.path('/admin/entry/' + entry_id);
    };

    // method to handle entry delete
    $scope.deleteEntryTranslation = function() {
      // attempt the update
      EntryTranslationService.delete(entry_id, translation.id).then(
        function(data){
            $location.path('/admin/entry/' + entry_id);
        }
      );
    };

    // method to handle form submission
    $scope.processEntryTranslationForm = function() {

      // reset error messages
      $scope.errorTitle = '';
      $scope.errorContent = '';
      $scope.non_field_errors = '';

      // attempt the update
      EntryTranslationService.update(entry_id, $scope.translation).then(
        function(data){
            $location.path('/admin/entry/' + entry_id);
        },
        function(data){
          if (data.title) {
            $scope.errorTitle = data.title[0];
          }
          if (data.content) {
            $scope.errorContent = data.content[0];
          }
        }
      );
    };
  }])

  // blog create entry translation controller
  .controller('BlogCreateEntryTranslationController', [
    '$scope', '$window', '$location', '$sce', 'EntryTranslationService',
    'entry_id', function(
        $scope, $window, $location, $sce, EntryTranslationService,
        entry_id) {
    $scope.entry_id = entry_id;
    $scope.translation = {
      'language':  '',
      'title': '',
      'content': ''
    }

    // markdown preview
    $scope.markdownToHtml = function() {
      $scope.html = $window.marked($scope.translation.content);
      $scope.PreviewHTML = $sce.trustAsHtml($scope.html);
    };

    // method to cancel the create of a blog entry translation
    $scope.cancelCreate = function() {
      $location.path('/admin/entry/' + entry_id);
    };

    // method to handle form submission
    $scope.processCreateTranslationForm = function() {

      // reset error messages
      $scope.errorLanguage = '';
      $scope.errorTitle = '';
      $scope.errorContent = '';
      $scope.non_field_errors = '';

      // attempt the update
      EntryTranslationService.create(entry_id, $scope.translation).then(
        function(data){
            $location.path('/admin/entry/' + entry_id);
        },
        function(data){
          if (data.non_field_errors) {
            $scope.non_field_errors = data.non_field_errors[0];
          }
          if (data.language) {
            $scope.errorLanguage = data.language[0];
          }
          if (data.title) {
            $scope.errorTitle = data.title[0];
          }
          if (data.content) {
            $scope.errorContent = data.content[0];
          }
        }
      );
    };
  }])

  // logout controller
  .controller('LogoutController', ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
    if(AuthenticationService.isLoggedIn()){
      AuthenticationService.logout();
    }
    $location.path('/');
  }])

  // login controller
  .controller('LoginController', ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
    $scope.formData = {}

    // if we are already logged in then there is no sense in rendering the login form
    if(AuthenticationService.isLoggedIn()){
      $location.path('/');
    }

    // process the login form
    $scope.processLoginForm = function() {

      // reset error messages
      $scope.errorUsername = '';
      $scope.errorPassword = '';
      $scope.non_field_errors = '';

      // attempt the login and listen for promise. If success redirect to home.
      // if errors then display them.
      AuthenticationService.login($scope.formData).then(
        function(){
          $location.path('/');
        },
        function(errorResponse){
          if (errorResponse.non_field_errors) {
            $scope.non_field_errors = errorResponse.non_field_errors[0];
          }
          if (errorResponse.username) {
            $scope.errorUsername = errorResponse.username[0];
          }
          if (errorResponse.password) {
            $scope.errorPassword = errorResponse.password[0];
          }
        });
    };
  }]);
