import rename from 'gulp-rename'
import cssnano from 'cssnano'
import cleanCss from 'gulp-clean-css'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'

const sass = gulpSass(dartSass)

// Оптимизация: в dev режиме без минификации для скорости
const stylesDev = []

const stylesBuild = [
  cssnano({
    preset: [
      'advanced',
      {
        cssDeclarationSorter: { order: 'smacss' },
        discardComments: { removeAll: true },
        normalizeWhitespace: false,
      },
    ],
  }),
]

export const styles = () => {
  // Базовый поток: общие шаги для всех сборок
  const createBaseStream = () =>
    app.gulp
      .src(app.path.src.styles, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber({
          errorHandler: function (err) {
            app.plugins.notify.onError({
              title: 'STYLE',
              message: 'Error: <%= error.message %>',
            })(err)
            this.emit('end')
          },
        }),
      )
      .pipe(app.plugins.replace(/\$img\//g, '../img/'))

  if (app.isDev) {
    // DEV: один файл с .min суффиксом (для совместимости), без минификации
    return createBaseStream()
      .pipe(
        app.plugins.if(
          app.isDev,
          app.plugins.sourcemaps.init({ loadMaps: true }),
        ),
      )
      .pipe(sass(stylesDev)) // просто компиляция SCSS
      .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write('.')))
      .pipe(rename({ suffix: '.min', prefix: '' })) // main.min.css (не сжатый)
      .pipe(app.gulp.dest(app.path.build.styles))
      .pipe(app.plugins.browsersync.stream())
  } else {
    // BUILD: два файла

    // 1. Обычный CSS (без минификации)
    const unminified = createBaseStream()
      .pipe(sass(stylesDev)) // компиляция БЕЗ cssnano
      // cleanCss НЕ применяем — оставляем форматирование
      .pipe(rename({ suffix: '', prefix: '' })) // main.css
      .pipe(app.gulp.dest(app.path.build.styles))
      .pipe(app.plugins.browsersync.stream())

    // 2. Минифицированный CSS
    const minified = createBaseStream()
      .pipe(sass(stylesBuild)) // компиляция С cssnano
      .pipe(cleanCss({ level: { 1: { specialComments: 1 } } })) // доп. очистка
      .pipe(rename({ suffix: '.min', prefix: '' })) // main.min.css
      .pipe(app.gulp.dest(app.path.build.styles))
      .pipe(app.plugins.browsersync.stream())

    return merge(unminified, minified)
  }
}
