'use strict';

/* jasmine specs for router config go here */
describe('$route', function(){
  beforeEach(module('ngRoute'));

  it('should map routes to controllers', function() {
    module('myApp');

    inject(function($route) {

      expect($route.routes['/view1'].controller).toBe('MyCtrl1');
      expect($route.routes['/view1'].templateUrl).
        toEqual('partials/partial1.html');

      expect($route.routes['/view2'].controller).toBe('MyCtrl2');
      expect($route.routes['/view2'].templateUrl).
        toEqual('partials/partial2.html');

      // otherwise redirect to
      expect($route.routes[null].redirectTo).toEqual('/view1')
    });
  });
});

