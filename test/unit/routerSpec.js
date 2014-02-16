'use strict';

/* jasmine specs for router config go here */
describe('$route', function(){

  it('should map routes to controllers', function() {
    module('BadMovieKnights');

    inject(function($route) {

      expect($route.routes['/'].controller).toBe('BlogController');
      expect($route.routes['/'].templateUrl).
        toEqual('partials/blog.html');

      expect($route.routes['/entry/:id'].controller).toBe('BlogEntryController');
      expect($route.routes['/entry/:id'].templateUrl).
        toEqual('partials/entry.html');

      // otherwise redirect to
      expect($route.routes[null].redirectTo).toEqual('/')
    });
  });
});

