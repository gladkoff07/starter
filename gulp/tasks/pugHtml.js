import webpHtmlNosvg from "gulp-webp-html-nosvg"
import versionNumber from "gulp-version-number"
import pug from "gulp-pug"

export const html = (done) => {
  app.gulp
    .src(app.path.src.pug)
    // Кэшируем файлы в памяти
    .pipe(app.plugins.cached('pug'))
    .pipe(
      pug({
        // Оптимизация: в dev режиме без форматирования для скорости
        pretty: app.isDev ? false : true,
        verbose: app.isDev ? false : true,
      })
    )
    .pipe(app.plugins.replace(/\$img\//g, "img/"))
    // Помним все файлы для правильной пересборки
    .pipe(app.plugins.remember('pug'))
    // .pipe(webpHtmlNosvg())
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())
  return done()
}
