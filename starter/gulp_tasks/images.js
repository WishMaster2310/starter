const gulp = require('gulp');
const tinypng = require('gulp-tinypng-compress');

function task (config) {
  return {
    tinypng: () => {
      return gulp.src(config.tinypng.src, { base: config.tinypng.base })
        .pipe(tinypng(config.tinypng.options))
        .pipe(gulp.dest(config.tinypng.dest));
    }
  }
}
module.exports = task