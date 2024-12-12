import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = (done) => {
  app.gulp
    .src(app.path.src.pug)
    .pipe(
      pug({
        pretty: true,
        verbose: true,
      })
    )
    .pipe(app.plugins.replace(/\$img\//g, "img/"))
    .pipe(webpHtmlNosvg())
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
  return done();
};
