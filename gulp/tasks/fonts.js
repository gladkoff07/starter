import fs from "fs"
import ttf2woff from "gulp-ttf2woff"
import ttf2woff2 from "gulp-ttf2woff2"
import newer from "gulp-newer"

export const ttfToWoff = () => {
  return app.gulp
    .src(app.path.src.fontsSource, {
      encoding: false, // Important!
      removeBOM: false,
    })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(newer({
      dest: app.path.build.fonts,
      ext: '.woff' // Указываем целевое расширение
    }))
    .pipe(ttf2woff())
    .pipe(app.gulp.dest(app.path.build.fonts))
}

export const ttfToWoff2 = () => {
  return app.gulp
    .src(app.path.src.fontsSource, {
      encoding: false, // Important!
      removeBOM: false,
    })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(newer({
      dest: app.path.build.fonts,
      ext: '.woff2' // Указываем целевое расширение
    }))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts))
}

export const styleFonts = async (cb) => {
  // Используем уже объявленный fs из верхнего уровня файла
  const fsp = fs.promises; 
  const fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;
  
  const fontWeightMap = {
    thin: 100, hairline: 100, extralight: 200, ultralight: 200,
    light: 300, regular: 400, normal: 400, book: 400,
    medium: 500, semibold: 600, demibold: 600,
    bold: 700, extrabold: 800, ultrabold: 800,
    black: 900, heavy: 900,
  };

  try {
    // 1. ИСПРАВЛЕНИЕ: Создаем папку, если её нет (recursive: true безопасно, если папка уже есть)
    await fsp.mkdir(app.path.build.fonts, { recursive: true });

    const data = await fsp.readdir(app.path.build.fonts);
    const fontsList = data.filter((item) => item !== ".gitkeep");

    // 2. РЕКОМЕНДАЦИЯ: Гарантируем существование папки для SCSS файла
    // Иначе writeFile может выдать ошибку, если нет папки scss/base
    const scssDir = fontsFile.substring(0, fontsFile.lastIndexOf('/'));
    await fsp.mkdir(scssDir, { recursive: true });

    await fsp.writeFile(fontsFile, "");

    let fontFileOnly = null;

    for (let index = 0; index < fontsList.length; index++) {
      const fileName = fontsList[index];
      const fontFileName = fileName.split(".")[0];

      if (fontFileOnly !== fontFileName) {
        const parts = fontFileName.split("-");
        const weightCandidate = parts.length > 1 ? parts[parts.length - 1] : "400";
        const weightKey = weightCandidate.toLowerCase();

        let numericWeight = 400;

        if (fontWeightMap.hasOwnProperty(weightKey)) {
          numericWeight = fontWeightMap[weightKey];
        } else if (!isNaN(weightCandidate)) {
          numericWeight = Number(weightCandidate);
        }

        const fontFaceString = `@font-face {\n\tfont-family: '${fontFileName}';\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${numericWeight};\n\tfont-style: normal;\n}\n`;

        await fsp.appendFile(fontsFile, fontFaceString);

        fontFileOnly = fontFileName;
      }
    }

    cb();
  } catch (err) {
    console.error("Ошибка при генерации шрифтов:", err);
    cb(err);
  }
};
