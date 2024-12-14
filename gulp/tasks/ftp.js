import ftp from "vinyl-ftp";
import gutil from "gulp-util";

// add settings Host(create file apiHost.js for your data)
// import dataHost from "../../apiHost.js";

export const deploy = async () => {
  const conn = ftp.create({
    host: dataHost.host,
    user: dataHost.user,
    password: dataHost.password,
    parallel: 3,
    maxConnections: 5,
    reload: true,
    log: gutil.log,
  });

  var globs = [
    "build/css/**",
    "build/js/*.js",
    "build/svg/*.svg",
    "build/img/**/*.{jpg,jpeg,png,gif,webp,svg}",
    "build/fonts/*.{woff, woff2}",
    "build/*.html",
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return await app.gulp
    .src(globs, { base: "build", buffer: false })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FTP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(conn.newer("www/html/team-orange.ru/sites/name/")) // only upload newer files
    .pipe(conn.dest("www/html/team-orange.ru/sites/name/"));
};
