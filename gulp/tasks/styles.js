import rename from "gulp-rename";
import cssnano from "cssnano";
import cleanCss from "gulp-clean-css";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";

const sass = gulpSass(dartSass);

const stylesDev = [
  cssnano({
    preset: [
      "lite",
      {
        normalizeWhitespace: false,
        discardComments: false,
        cssDeclarationSorter: { order: "smacss" },
      },
    ],
  }),
];

const stylesBuild = [
  cssnano({
    preset: [
      "advanced",
      {
        cssDeclarationSorter: { order: "smacss" },
        discardComments: { removeAll: true },
        normalizeWhitespace: false,
      },
    ],
  }),
];

export const styles = () => {
  return app.gulp
    .src(app.path.src.styles)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "STYLE",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.init()))
    .pipe(app.plugins.replace(/\$img\//g, "../img/"))
    .pipe(sass(app.isBuild ? stylesBuild : stylesDev))
    .pipe(
      app.plugins.if(
        app.isBuild,
        cleanCss({ level: { 1: { specialComments: 1 } } })
      )
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write()))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.browsersync.stream());
};
