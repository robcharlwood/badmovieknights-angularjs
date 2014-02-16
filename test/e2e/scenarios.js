'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('bad movie knights', function() {

  beforeEach(function() {
    browser().navigateTo('app/index.html');
  });


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/");
  });


  describe('blog', function() {

    beforeEach(function() {
      browser().navigateTo('#/');
    });


    it('should render blog when user navigates to /', function() {
      expect(browser().location().url()).toBe("/");
    });

  });
});
