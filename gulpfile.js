var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var karma = require('karma').server;
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var connect = require('gulp-connect');

gulp.task('build', ['tdd'], function () {
  return browserify('./src/scripts/app.js', {
    debug: true
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('tdd', ['eslint'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('eslint', function () {
  return gulp.src(['./src/scripts/**/*.js', '!./src/scripts/vendor/*.js', '!./src/scripts/bundle.js'])
    .pipe(eslint({
      /*my rules*/
      'rules': {
        'accessor-pairs': 2,
        'curly': 2,
        'default-case': 2,
        'dot-notation': 1,
        'eqeqeq': 1,
        'no-alert': 2,
        'no-empty-function': 1,
        'no-empty-pattern': 2,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-fallthrough': 2,
        'no-lone-blocks': 2
      },
      'globals': {
        'jQuery': false,
        '$': true
      },
      /*eslint airbnb*/
      configFile: './test/.eslint.json'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results(function (results) {
      console.log('ESlint Results: \n');
      console.log('Total Warnings: ' + results.warningCount);
      console.log('Total Errors: ' + results.errorCount);
      console.log('\nSuccess');
    }));
});

gulp.task('server', ['buildApp'], function(){
  connect.server({
    root: './build',
    port: 8000
  });
});

/*
 * Single tasks that are not used by default
 */
gulp.task('uglify', function (cb) {
  pump([
    gulp.src('./src/scripts/bundle.js'),
    uglify({ preserveComments: 'license' }),
    gulp.dest('./src/scripts/')
  ],
    cb
  );
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('jshint', function () {
  return gulp.src(['./src/scripts/**/*.js', '!./src/scripts/vendor/*.js', '!./src/scripts/bundle.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('css', function () {
  return gulp.src('./src/css/*.css')
    .pipe(concat('all.css'))
    .pipe(cssmin({
      showLog: true,
      target: './build/css'
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('forceBuild', function () {
  return browserify('./src/scripts/app.js', {
    debug: true
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/scripts/'));
});


gulp.task('buildApp', ['build', 'css']);
gulp.task('default', ['server']);
gulp.task('prod', ['server']);