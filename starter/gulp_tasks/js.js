const gulp = require('gulp');
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const exec = require('child_process').exec;

function task (options) {
  const { prod, dev, libs, lodash } = options;
  return {
    dev: () => {
      return gulp.src(dev.src)
        .pipe(gulpIf(
          dev.sourcemaps,
          sourcemaps.init()
        ))
        .pipe(babel(dev.babel)
          .on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "JS Compile Error"
          }))
        )
        .pipe(gulpIf(
          dev.uglify,
          uglify()
        ))
        .pipe(gulpIf(
          dev.sourcemaps,
          sourcemaps.write(dev.sourcemaps)
        ))
        .pipe(sourcemaps.write(dev.sourcemaps))
        .pipe(gulp.dest(dev.dest));
    },
    prod: () => {
      return gulp.src(prod.src)
        .pipe(gulpIf(
          prod.sourcemaps,
          sourcemaps.init()
        ))
        .pipe(babel(prod.babel)
          .on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "JS Compile Error"
          }))
        )
        .pipe(gulpIf(
          prod.uglify,
          uglify()
        ))
        .pipe(gulpIf(
          prod.sourcemaps,
          sourcemaps.write(prod.sourcemaps)
        ))
        .pipe(sourcemaps.write(prod.sourcemaps))
        .pipe(gulp.dest(prod.dest));
    },
    libs: () => {
      return gulp.src(libs.src)
        .pipe(uglify())
        .pipe(concat(libs.name))
        .pipe(gulp.dest(libs.dest));
    },
    lodash: callback => {
      // require npm install -g lodash-cli
      return exec(`lodash ${lodash.include} -p -o "${lodash.dest}${lodash.name}"`, err => {
        console.log(`lodash file ${lodash.name} created with: ${lodash.include}`);
        callback(err)
      })
    }
  }
}

module.exports = task;
gulp.task('lodash', cb => {
  // require npm install -g lodash-cli
  return exec(`lodash ${config.lodash} -p -o "public/javascripts/libs/lodash.custom.min.js"`, (err, stdout, stderr) => {
    console.log(`lodash file created with: ${config.lodash}`);
    cb(err)
  })
});