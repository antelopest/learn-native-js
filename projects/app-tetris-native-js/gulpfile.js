const GULP = require('gulp');
const BROWSER_SYNC = require('browser-sync');

GULP.task('browser-sync', () => {
  BROWSER_SYNC({
    server: {
      baseDir: 'app',
    },
    notify: false,
  })
});

GULP.task('watch', () => {
  GULP.watch('app/index.html').on('change', BROWSER_SYNC.reload);
  GULP.watch('app/index.css').on('change', BROWSER_SYNC.reload);
  GULP.watch(['app/index.js', 'app/src/game.js']).on('change', BROWSER_SYNC.reload);
});

GULP.task('default', GULP.parallel('browser-sync', 'watch'));
