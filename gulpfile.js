const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('styles', function () {
  return gulp.src("src/sass/*.scss")
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest("src/css"));
});

gulp.task('watch', function () {
  gulp.watch("src/sass/*.scss", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'styles'));
