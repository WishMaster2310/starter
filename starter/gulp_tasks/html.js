const gulp = require('gulp');
const prettify = require('gulp-html-prettify');

function task (config) {
  return {
    prettify: () => {
      return gulp.src(config.prettify.src, { base: config.prettify.base })
        .pipe(prettify(config.prettify.options))
        .pipe(gulp.dest(config.prettify.dest));
    }
  }
}
module.exports = task