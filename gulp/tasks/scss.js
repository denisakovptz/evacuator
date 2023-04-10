import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // сжатие css
//import webpcss from 'gulp-webpcss'; // вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
//import groupCssMediaQueries from 'gulp-group-css-media-queries'; // группировка медиа запросов


const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { soucemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      /*
            .pipe(
               app.plugins.ifPlugin(
                  app.isBuild,
                  groupCssMediaQueries()
               )
            )
            .pipe(
               app.plugins.ifPlugin(
                  app.isBuild,
                  webpcss({
                     webpClass: ".webp",
                     noWebpClass: ".no-webp"
                  })
               )
            )*/
      .pipe(
         app.plugins.ifPlugin(
            app.isBuild,
            autoprefixer({
               grid: true,
               overrideBrowserslist: ["last 3 versions"],
               cascade: true
            })
         )
      )

      .pipe(app.gulp.dest(app.path.build.css)) // раскомментировать если нужен не сжатый дубль файла стилей

      .pipe(
         app.plugins.ifPlugin(
            app.isBuild,
            cleanCss()
         )
      )

      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
}