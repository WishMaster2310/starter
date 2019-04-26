const gulp = require('gulp');
const less = require('gulp-less');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const notify = require('gulp-notify');
// опции clean-css https://github.com/jakubpawlowicz/clean-css/tree/v3.0.1
function task (lessConfig) {
  const options = {
    dev: {
      plugins: [
        new LessPluginAutoPrefix({
          browsers: lessConfig.dev.autoprefix
        })
      ],
      modifyVars: lessConfig.dev.modifyVars
    },
    prod: {
      plugins: [
        new LessPluginAutoPrefix({
          browsers: lessConfig.prod.autoprefix
        }),
        new LessPluginCleanCSS({
          advanced: true
        })
      ],
      modifyVars: lessConfig.prod.modifyVars
    }
  }

  return {
    dev: () => {
      return gulp
        .src(lessConfig.dev.src)
        .pipe(less(options.dev).on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "Less Compile Error"
          }))
        )
        .pipe(gulp.dest(lessConfig.dev.dest));
    },
    prod: () => {
      return gulp
        .src(lessConfig.prod.src)
        .pipe(less(options.prod).on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "Less Compile Error"
          }))
        )
        .pipe(gulp.dest(lessConfig.prod.dest));
    }
  }
}

module.exports = task;
