var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

gulp.task('default', ['browser', 'client']);

gulp.task('client', function () {
  return gulp.src('index.js')
    .pipe(browserify({
      standalone: 'ansiToHtmlStream'
    }))
    .pipe(rename('browser.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('browser', function () {
  return gulp.src('test/browser/tests.js')
    .pipe(browserify())
    .pipe(rename('browser.js'))
    .pipe(gulp.dest('./test/browser'));
});
