module.exports = function (config) {
  config.set({
    frameworks: ['browserify', 'jasmine'],
    files: [
      'src/scripts/vendor/jquery-2.1.4.js',
      'src/scripts/vendor/jquery.bxslider.min.js',
      'src/scripts/vendor/jquery-ui-1.11.4.js',
      'src/scripts/vendor/jquery.mCustomScrollbar.concat.min.js',
      'src/scripts/app.js',
      'test/spec/js/Utils.test.js',
      'test/spec/js/CitiesModel.test.js',
      'test/spec/js/SettingsModel.test.js'
    ],
    preprocessors: {
      'src/scripts/app.js': ['browserify'],
      'test/spec/js/Utils.test.js': ['browserify'],
      'test/spec/js/CitiesModel.test.js': ['browserify'],
      'test/spec/js/SettingsModel.test.js': ['browserify']
    },
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    browserify: {
      debug: true
    }
  });
};
