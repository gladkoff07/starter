import fs from "fs";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import fonter from "gulp-fonter";

// export const oftToTtf = () => {
//   return app.gulp
//     .src(`${app.path.src.fontsSource}/*.otf`)
//     .pipe(
//       fonter({
//         formats: ["ttf"],
//       })
//     )
//     .pipe(app.gulp.dest(app.path.src.fontsSource));
// };

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
    .pipe(ttf2woff())
    .pipe(app.gulp.dest(app.path.src.fonts))
    .pipe(app.gulp.src(app.path.src.fonts))
    .pipe(app.gulp.dest(app.path.build.fonts));
};

export const ttfToWoff2 = () => {
  return app.gulp
    .src(app.path.src.fontsSource, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FONTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.src.fonts))
    .pipe(app.gulp.src(app.path.src.fonts))
    .pipe(app.gulp.dest(app.path.build.fonts));
};

export const styleFonts = (cb) => {
  let fontsFile = `${app.path.srcFolder}/scss/core/_fonts.scss`;
  fs.readdir(app.path.src.fonts, (err, data) => {
    if (!err) {
      data = data.filter((item) => item !== ".gitkeep");

      fs.writeFile(fontsFile, "", (err) => {
        if (err) {
          console.error(err);
          return;
        }

        let fontFileOnly;
        for (let index = 0; index < data.length; index++) {
          let fontFileName = data[index].split(".")[0];

          if (fontFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;

            fs.appendFile(
              fontsFile,
              `@font-face {\n\t font-family: ${fontFileName};\n\t font-display: swap;\n\t src: url("../fonts/${fontFileName}.woff2") format("woff2"),url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\t font-style: normal;\n}\r\n`,
              (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              }
            );
            fontFileOnly = fontFileName;
          }
        }
      });
    } else {
      console.error(err);
    }
  });
  cb();
};
