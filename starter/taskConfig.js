module.exports = {
  less: {
    dev: {
      src: "public/less/*.less",
      dest: "public/stylesheets/",
      autoprefix: ["last 2 versions"],
      modifyVars: {
        "@env": "dev"
      }
    },
    prod: {
      src: "public/less/*.less",
      dest: "build/stylesheets/",
      autoprefix: ["last 10 versions", "IE 10", "IE 11"],
      modifyVars: {
        "@env": "prod"
      }
    }
  },
  svg: {
    sprite: {
      src: "public/svg/*.svg",
      dest: "views/blocks",
      options: {
        id: "i-%f",
        svgClassname: "svg-icon-store",
        templates: ["default-svg"]
      }
    }
  },
  js: {
    dev: {
      src: ["public/javascripts/sources/*.js"],
      dest: "public/javascripts/",
      uglify: false,
      sourcemaps: "../javascripts/",
      babel: { presets: ["env"] },
    },
    prod: {
      src: "public/javascripts/sources/*.js",
      dest: "build/javascripts/",
      uglify: true,
      sourcemaps: "../javascripts/",
      babel: { presets: ["env"] },
    },
    libs: {
      src: ["public/javascripts/libs/*.js"],
      name: "libs.min.js",
      dest: "public/javascripts/"
    },
    // lodash task require npm install -g lodash-cli
    lodash: {
      dest: "public/javascripts/libs/",
      name: "lodash.custom.min.js",
      include: "include=each,filter,map,find,findIndex,sortBy"
    }
  },
  images: {
    /**
     * Оптимизирует растровые изображения
     * формата png,jpg,jpeg, Обязательно нужно указать
     * в поле key, Ваш APi-KEY https://tinypng.com/developers
     * статистика по ключам тут https://tinypng.com/dashboard/api
     * !FIXME: перенести api-key в env.local
     */
    tinypng: {
      src: "public/images/*.{png,jpg,jpeg}",
      base: "./",
      dest: "./",
      options: {
        key: "qsWn151gwKyW88TbNIU1qHG6XuSaJjOT", 
        sameDest: true,
        summarise: true,
        log: true
      }
    }
  },
  html: {
    prettify: {
      src: "build/*.html",
      base: "./",
      dest: "./",
      options: {
        indent_char: ' ',
        indent_size: 2,
        //unformatted: [],
        no_preserve_newlines: true
      }
    }
  }
}