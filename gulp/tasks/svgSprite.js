import svgSprite from "gulp-svg-sprites";

export const svgSprites = () => {
  return app.gulp
    .src(app.path.src.svgSource, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: "symbols",
      })
    )
    .pipe(app.gulp.dest(app.path.src.svg))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.svg));
};
