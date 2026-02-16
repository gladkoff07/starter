// import { src, dest, series, parallel, watch } from 'gulp';
import imageminWebp from "imagemin-webp";
import imageMin from "gulp-imagemin";
import extReplace from "gulp-ext-replace";
import newer from "gulp-newer";

export const images = () => {
  const stream = app.gulp
    .src(app.path.src.imgSource, { encoding: false })
    .pipe(app.plugins.newer({dest: app.path.build.img, ext: '.webp'}))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      imageMin({
        progressive: true,
        verbose: true,
        plugins: imageminWebp({ quality: 60 }),
      })
    )
    .pipe(extReplace(".webp"))
    .pipe(app.gulp.dest(app.path.build.img));
  return stream;
};

export const copyImages = () => {
  return app.gulp
    .src(app.path.src.imgSvg, { encoding: false })
    .pipe(app.plugins.newer({dest: app.path.build.img, ext: '.svg'}))
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "COPY IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.img));
};
