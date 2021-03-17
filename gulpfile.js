const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const uglify = require('gulp-uglify');

gulp.task('es6-min', () => {
  // src is the dir containing uncompiled scripts
  return gulp.src('./src/app.js').pipe(
    babel({
      presets: ['@babel/preset-env']
    })).pipe(uglify()).pipe(
      gulp.dest('js')
    );
});

gulp.task('sass', () => {
  return gulp.src('./scss/**/*.scss').pipe(
    sass({outputStyle: 'compressed'}).on('error', sass.logError)
  ).pipe(
    gulp.dest('./css')
  );
});

gulp.task('default', () => {
  gulp.series(['es6-min', 'sass']);
  // Watch for changes made to any .js file and compile
  gulp.watch('./src/app.js', gulp.series('es6-min'));
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});
