var gulp = require("gulp");
var ts = require("gulp-typescript");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var tsify = require("tsify");
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

gulp.task('clean-dist', () =>
  gulp.src([
    'dist/**/*.*',
  ]).pipe(clean({
    force: true
  }))
);

gulp.task("default", ['clean-dist'], function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/node"));
});

gulp.task("umd", ['clean-dist'], function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist/node"));
});

gulp.task("browser", ['clean-dist'], function () {
  return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/main.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('droi.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    //.pipe(uglify())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("web"));
});