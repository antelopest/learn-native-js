const
  GULP = require('gulp'),
  SASS = require('gulp-sass'),
  BROWSERSYNC = require('browser-sync'),
  RSYNC = require('gulp-rsync'),
  CONCAT = require('gulp-concat'),
  AUTOPREFIXER = require('gulp-autoprefixer'),
  CLEANCSS = require('gulp-clean-css'),
  UGLIFY = require('gulp-uglify-es').default;

GULP.task('browser-sync', () => {
  BROWSERSYNC({
    server: {
      baseDir: 'app',
    },
    notify: false,
  })
});

// CUSTOM STYLES
GULP.task('styles', () => {
  return GULP.src('app/sass/**/*.sass')
    .pipe(SASS({
      outputStyle: 'expanded',
      includePaths: [__dirname + '/node_modules']
    }))
    .pipe(CONCAT('styles.min.css'))
    .pipe(AUTOPREFIXER({
      grid: true,
      overrideBrowserslist: ['last 10 versions'],
    }))
    .pipe(CLEANCSS({
      level: { 1: { specialCommnets: 0 }}
    }))
    .pipe(GULP.dest('app/css'))
    .pipe(BROWSERSYNC.stream())
});

// SCRIPT
GULP.task('scripts', () => {
  return GULP.src([
    'app/js/_libs.js',
    'app/js/_custom.js',
  ])
    .pipe(CONCAT('script.min.js'))
    .pipe(UGLIFY())
    .pipe(GULP.dest('app/js'))
    .pipe(BROWSERSYNC.reload({ stream: true }))
});

// WATCH
GULP.task('watch', () => {
  GULP.watch('app/index.html', GULP.parallel('code'));
  GULP.watch('app/index.css', GULP.parallel('styles'));
  GULP.watch(['app/index.js'], GULP.parallel('scripts'));
});

// CODE & RELOAD
GULP.task('code', () => {
  return GULP.src('app/**/*.html')
    .pipe(BROWSERSYNC.reload({ stream: true }))
});


GULP.task('default', GULP.parallel('browser-sync', 'watch'));
