import * as nodePath from "path"
const rootFolder = nodePath.basename(nodePath.resolve())
const buildFolder = "./build"
const cleanFolder = "./build"
const srcFolder = "./src"

export const path = {
  build: {
    html: `${buildFolder}/`,
    styles: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    img: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    svg: `${buildFolder}/`,
  },
  src: {
    pug: `${srcFolder}/pug/*.{html,pug,php,ico}`,
    styles: `${srcFolder}/scss/*.scss`,
    js: [`${srcFolder}/js/*.js`, `!${srcFolder}/js/vendor.js`],
    jsLibs: `${srcFolder}/js/vendor.js`,
    img: `${srcFolder}/img/`,
    imgSource: `${srcFolder}/sources/img/*.{jpg,jpeg,png,gif,webp}`,
    imgSvg: `${srcFolder}/sources/img/svg/*.svg`,
    fonts: `${srcFolder}/fonts/`,
    fontsSource: `${srcFolder}/sources/fonts/*`,
    svg: `${srcFolder}/`,
    svgSource: `${srcFolder}/sources/svg/*.svg`,
    sources: `${srcFolder}/sources/`,
  },
  watch: {
    pug: `${srcFolder}/**/*.{html,pug,php}`,
    styles: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/*.js`,
    imgSvg: `${srcFolder}/sources/img/svg/*.svg`,
    imgSource: `${srcFolder}/sources/img/*.{jpg,jpeg,png,gif,webp}`,
    fonts: `${srcFolder}/sources/fonts/`,
    svg: `${srcFolder}/sources/svg/*.svg`,
  },
  clean: [`${buildFolder}/**`, `!${buildFolder}/img/**`, `!${buildFolder}/img`],
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
}
