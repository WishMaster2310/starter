const path = require('path');
const gulp = require('gulp');
const log = require('fancy-log');
const gls = require('gulp-live-server');
const runSequence = require('run-sequence');

const STARTER_CONFIG = require('./starter/config');
const options = STARTER_CONFIG.tasks;

const lessTasks = require('./starter/gulp_tasks/less')(options.less);
const svgTasks = require('./starter/gulp_tasks/svg')(options.svg);
const jsTasks = require('./starter/gulp_tasks/js')(options.js);
const imageTasks = require('./starter/gulp_tasks/images')(options.images);
const htmlTasks = require('./starter/gulp_tasks/html')(options.html);

gulp.task('svg:sprites', svgTasks.sprite);
gulp.task('less:dev', lessTasks.dev);
gulp.task('less:prod', lessTasks.prod);
gulp.task('js:dev', jsTasks.dev);
gulp.task('js:prod', jsTasks.prod);
gulp.task('js:libs', jsTasks.libs);
gulp.task('js:lodash', jsTasks.lodash);
gulp.task('images:tinypng', imageTasks.tinypng);
gulp.task('html:prettify', htmlTasks.prettify);

gulp.task('default', () => {
  let server = gls.new('bin/www');
  server.start();
  gulp.watch(STARTER_CONFIG.restartTriggerFiles, file => {
    log(`File ${path.basename(file.path)} was ${file.type} => restart server`);
    server.start.bind(server)();
    server.notify.apply(server, [file]);
  });
  gulp.watch(STARTER_CONFIG.reloadTriggerFiles, file => {
    log(`File ${path.basename(file.path)} was ${file.type} => livereload`);
    server.notify.apply(server, [file]);
  });

  gulp.watch(['public/javascripts/libs/*.js'], ['js:libs']);
  gulp.watch(['public/svg/*.svg'], ['svg:sprites']);
  gulp.watch(['public/javascripts/sources/*.js'], ['js:dev']);
  gulp.watch(['public/less/*.less', 'public/less/**/*.less'], ['less:dev']);
});

gulp.task('copyStatic', () => {
  const arr = ['public/**'];
  const { buildIgnorePaths } = STARTER_CONFIG;
  if (buildIgnorePaths) {
    buildIgnorePaths.forEach(ignoredPath => {
      // FIXME: как то надо пофиксить проверку на директорию
      // сейчас максимально ебано сделано
      if (ignoredPath.split('.').length === 1 ) {
        arr.push(`!public/${ignoredPath}`, `!public/${ignoredPath}/**`)
      } else {
        arr.push(`!public/${ignoredPath}`);
      }
    })
  }
  return gulp.src(arr).pipe(gulp.dest(`${STARTER_CONFIG.buildDir}`))
});

gulp.task('build', cb => {
  runSequence(
    'js:libs',
    'html:prettify',
    'copyStatic',
    ['less:prod', 'js:prod'],
    cb)
});