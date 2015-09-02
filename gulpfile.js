var gulp = require('gulp');
var newer = require('gulp-newer');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var inline = require('gulp-inline-source');
var del = require('del');
var ghPages = require('gulp-gh-pages');

gulp.task('html', function() {
  return gulp.src('src/**/*.jade')
    .pipe(newer({dest: '_site/', ext: '.html'}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('_site/'))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src('src/**/*.styl')
    .pipe(newer({dest: '_site/', ext: '.css'}))
    .pipe(stylus({compress: true}))
    .pipe(prefix('last 3 versions'))
    .pipe(gulp.dest('_site/'))
    .pipe(browserSync.stream());
});

gulp.task('assets', function() {
  return gulp.src('assets/**/*')
    .pipe(newer('_site/'))
    .pipe(gulp.dest('_site/'))
    .pipe(browserSync.stream());
});

gulp.task('build', ['html', 'css', 'assets']);

gulp.task('watch', ['build'], function() {
  browserSync.init({ server: '_site/', browser: 'google chrome canary', ghostMode: false });
  gulp.watch("src/**/*.styl", ['css']);
  gulp.watch("src/**/*.jade", ['html']);
  gulp.watch("assets/**/*", ['assets']);
});

gulp.task('clean', function(cb) { del(['_site/'], cb); });

gulp.task('prod', ['clean', 'build'], function() {
  gulp.src('_site/**/*.html')
    .pipe(inline())
    .pipe(gulp.dest('_site/'))
    .on('end', function() {
      del(['_site/**/_*']);
    });
});

gulp.task('deploy', ['prod'], function() {
  return gulp.src('_site/**/*')
    .pipe(ghPages({ branch: 'master' }));
});
