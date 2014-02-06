'use strict';

/* jasmine specs for router config go here */
describe('$route', function(){

  it('should map routes to controllers', function() {
    module('BadMovieKnights');

    inject(function($route) {

      expect($route.routes['/'].controller).toBe('BlogController');
      expect($route.routes['/'].templateUrl).
        toEqual('partials/blog.html');

      expect($route.routes['/view2'].controller).toBe('MyCtrl2');
      expect($route.routes['/view2'].templateUrl).
        toEqual('partials/partial2.html');

      // otherwise redirect to
      expect($route.routes[null].redirectTo).toEqual('/')
    });
  });
});

