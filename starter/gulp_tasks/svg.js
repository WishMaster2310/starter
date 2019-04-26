const gulp = require('gulp');
const svgSprite = require('gulp-svg-symbols');
function task (config) {
  return {
    sprite: () => {
      return gulp.src(config.sprite.src)
        .pipe(svgSprite(config.sprite.options))
        .pipe(gulp.dest(config.sprite.dest));
    }
  }
}
module.exports = task