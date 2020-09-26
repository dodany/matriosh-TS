let gulp = require('gulp');
let sass = require('gulp-sass');
let rename = require('gulp-rename');

sass.compiler = require('node-sass');

gulp.task('styles', () => {
  return gulp.src('app.scss')
      .pipe(sass())
      .pipe(rename('app.css'))
      .pipe(gulp.dest('public'));
});


gulp.task('assets', () => {
  gulp.src('assets/*')
      .pipe(gulp.dest('public'));
})

gulp.task('watch', () => {
  gulp.watch('app.scss', gulp.series('styles'));
  gulp.watch('asset/*', gulp.series('assets'));
});

gulp.task('default', gulp.parallel('styles', 'assets'));
