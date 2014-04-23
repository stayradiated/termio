/*
 * Compile termio into a single for file with browserify.
 * For use only with the tests.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('default', ['termio', 'tests']);

gulp.task('termio', function () {
  var bundleStream = browserify('./index.js').bundle({
    standalone: 'Termio'
  });

  return bundleStream
    .pipe(source('termio.js'))
    .pipe(gulp.dest('./test/browser'));
});

gulp.task('tests', function () {
  var bundleStream = browserify('./test/browser/tests.js').bundle();
  return bundleStream
    .pipe(source('browser.js'))
    .pipe(gulp.dest('./test/browser'));
});
