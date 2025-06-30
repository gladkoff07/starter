import gulp from "gulp";
import { src, dest, watch, parallel, series, task } from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/pugHtml.js";
import { styles } from "./gulp/tasks/styles.js";
import { images, copyImages } from "./gulp/tasks/images.js";
import { scriptsDev, scriptsLibs } from "./gulp/tasks/scripts.js";
import { server } from "./gulp/tasks/server.js";
import { svgSprites } from "./gulp/tasks/svgSprite.js";
import { ttfToWoff, ttfToWoff2, styleFonts } from "./gulp/tasks/fonts.js";
import { deploy } from "./gulp/tasks/ftp.js";
import { zip } from "./gulp/tasks/zip.js";

global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

function watcher(done) {
  gulp.watch(path.watch.pug, html);
  gulp.watch(path.watch.styles, styles);
  gulp.watch(path.watch.js, scriptsDev);
  gulp.watch(path.watch.js, scriptsLibs);
  gulp.watch(path.watch.imgSource, images);
  gulp.watch(path.watch.imgSvg, copyImages);
  gulp.watch(path.watch.fonts, fonts);
  gulp.watch(path.watch.svg, svgSprites);
  done();
}

const fonts = series(parallel(ttfToWoff, ttfToWoff2), styleFonts);
const mainTasks = series(
  fonts,
  series(images, copyImages),
  parallel(html, styles, scriptsDev, scriptsLibs, svgSprites)
);
const dev = series(reset, mainTasks, parallel(watcher, server));
const build = series(reset, mainTasks);
const ftp = series(deploy);
const archive = series(zip);

export { archive };
export { ftp };
export { build };
gulp.task("default", dev);
