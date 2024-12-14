import zipPlugin from "gulp-zip";

export const zip = () => {
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, { encoding: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest("./"));
};
