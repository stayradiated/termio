/*
 * Compile termio into a single for file with browserify.
 * For use only with the tests.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('default', ['termio', 'tests']);

gulp.task('termio', function () {
  return gulp.src('index.js')
    .pipe(browserify({
      standalone: 'Termio'
    }))
    .pipe(rename('termio.js'))
    .pipe(gulp.dest('./test/browser'));
});

gulp.task('tests', function () {
  return gulp.src('test/browser/tests.js')
    .pipe(browserify())
    .pipe(rename('browser.js'))
    .pipe(gulp.dest('./test/browser'));
});
