import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import pug from 'gulp-pug'

export const html = (done) => {
  app.gulp
    .src(app.path.src.pug)

    // 🛡️ Обработчик ошибок ДО pug
    .pipe(
      app.plugins.plumber({
        errorHandler: function (err) {
          console.log('\x1b[33m%s\x1b[0m', '⚠️ Pug Error:') // жёлтый цвет
          console.log(`📄 Файл: ${err.fileName || 'unknown'}`)
          console.log(`📍 Строка: ${err.line}:${err.column}`)
          console.log(`❌ Сообщение: ${err.message}`)
          this.emit('end') // продолжаем стрим
        },
      }),
    )

    .pipe(
      pug({
        pretty: app.isDev ? false : true,
        verbose: app.isDev ? false : true,
      }),
    )

    // 🛡️ Дублируем plumber ПОСЛЕ pug для перехвата ошибок компиляции
    .pipe(
      app.plugins.plumber({
        errorHandler: function (err) {
          console.log('\x1b[33m%s\x1b[0m', '⚠️ Pug Compile Error:')
          console.log(`📄 Файл: ${err.fileName || 'unknown'}`)
          console.log(`❌ ${err.message}`)
          this.emit('end')
        },
      }),
    )

    .pipe(app.plugins.replace(/\$img\//g, 'img/'))
    .pipe(app.plugins.remember('pug'))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())

  return done()
}
