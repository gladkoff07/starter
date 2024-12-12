import imageminWebp from "imagemin-webp";
import imageMin from "gulp-imagemin";
import extReplace from "gulp-ext-replace";

export const images = () => {
  const stream = app.gulp
    .src(app.path.src.imgSource, { encoding: false })
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
