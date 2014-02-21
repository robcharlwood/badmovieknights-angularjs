module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/underscore/underscore.js',
      'app/lib/angular-underscore/angular-underscore.min.js',
      'app/lib/underscore.string/dist/underscore.string.min.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/lib/ng-file-upload/angular-file-upload.min.js',
      'app/lib/ui-bootstrap-tpls-0.10.0.min.js',
      'app/lib/angular-translate/angular-translate.min.js',
      'app/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      'app/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
            ],

    // coverage reporter generates the coverage
    reporters: ['dots', 'progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/js/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcovonly',
      dir : 'coverage/'
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
