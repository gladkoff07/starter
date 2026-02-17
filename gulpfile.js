import gulp from "gulp"
import { src, dest, watch, parallel, series, task } from "gulp"
import { path } from "./gulp/config/path.js"
import { plugins } from "./gulp/config/plugins.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/pugHtml.js"
import { styles } from "./gulp/tasks/styles.js"
import { images, copyImages } from "./gulp/tasks/images.js"
import { scriptsDev, scriptsLibs } from "./gulp/tasks/scripts.js"
import { server } from "./gulp/tasks/server.js"
import { svgSprites } from "./gulp/tasks/svgSprite.js"
import { ttfToWoff, ttfToWoff2, styleFonts } from "./gulp/tasks/fonts.js"
import { deploy } from "./gulp/tasks/ftp.js"
import { zip } from "./gulp/tasks/zip.js"

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

function watcher(done) {
  gulp.watch(path.watch.pug, html)
  gulp.watch(path.watch.styles, styles)

  // Объединенный watcher для JS — избегаем дублирования
  gulp.watch(path.watch.js, parallel(scriptsDev, scriptsLibs))

  // Изображения и SVG — только при наличии изменений
  gulp.watch(path.watch.imgSource, images)
  gulp.watch(path.watch.imgSvg, copyImages)
  gulp.watch(path.watch.svg, svgSprites)

  // Шрифты — редкие изменения
  gulp.watch(path.watch.fonts, fonts)

  done()
}

const fonts = series(parallel(ttfToWoff, ttfToWoff2), styleFonts)

// Оптимизированные задачи для быстрой начальной сборки
const fastDev = series(
  // Шрифты и спрайты — параллельно, не блокируют стили/скрипки
  parallel(fonts, svgSprites),
  // Стили, скрипты, HTML — параллельно
  parallel(html, styles, scriptsDev, scriptsLibs),
  // Изображения — в фоне, не блокируют запуск
  parallel(images, copyImages)
)

// Полная сборка (используется при build)
const mainTasks = series(
  fonts,
  parallel(images, copyImages),
  parallel(html, styles, scriptsDev, scriptsLibs, svgSprites)
)

const dev = series(fastDev, parallel(watcher, server))
const build = series(reset, mainTasks)
const ftp = series(deploy)
const archive = series(zip)

export { archive }
export { ftp }
export { build }
gulp.task("default", dev)
