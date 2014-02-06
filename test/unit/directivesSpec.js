'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('BadMovieKnights.directives'));

  // test the app version directive
  describe('app-version', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });

  // test the loading bar directive
  describe('pending-bar', function() {
    it("tests loading bar shows on routeChangeStart", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div id="loading" pending-bar>loading...</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeStart");
        expect(element.hasClass('hide')).toBe(false);
      });
    });
    it("tests loading bar is hidden on routeChangeSuccess", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div id="loading" pending-bar>loading...</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeSuccess");
        expect(element.hasClass('hide')).toBe(true);
      });
    });
    it("tests loading bar show on routeChangeError", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div id="loading" pending-bar>loading...</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeError");
        expect(element.hasClass('hide')).toBe(false);
      });
    });
  });

  // test the view-state directive
  describe('view-state', function() {
    it("tests view is hidden on routeChangeStart", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div view-state>content</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeStart");
        expect(element.hasClass('hide')).toBe(true);
      });
    });
    it("tests view is shown on routeChangeSuccess", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div view-state>content</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeSuccess");
        expect(element.hasClass('hide')).toBe(false);
      });
    });
    it("tests view is hidden on routeChangeError", function(){
      inject(function($compile, $rootScope) {
        var element = $compile(
          '<div view-state>content</div>')($rootScope);
        $rootScope.$broadcast("$routeChangeError");
        expect(element.hasClass('hide')).toBe(true);
      });
    });
  });

});
