import imageminWebp from "imagemin-webp";
import imageMin from "gulp-imagemin";
import extReplace from "gulp-ext-replace";
import newer from "gulp-newer";

const isSvg = (file) => {
  return file.extname === ".svg";
};

export const images = () => {
  const stream = app.gulp
    .src(app.path.src.imgSource, { encoding: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.src.img))
    .pipe(
      imageMin({
        progressive: true,
        verbose: true,
        plugins: imageminWebp({ quality: 60 }),
      })
    )
    .pipe(extReplace(".webp"))
    .pipe(app.gulp.dest(app.path.src.img))
    .pipe(app.gulp.src(app.path.src.img))
    .pipe(app.gulp.dest(app.path.build.img));
  return stream;
};

export const copyImages = () => {
  return app.gulp
    .src(app.path.src.imgSvg, { encoding: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "COPY IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.src.img))
    .pipe(app.gulp.src(app.path.src.imgSvg))
    .pipe(app.gulp.dest(app.path.build.img));
};
