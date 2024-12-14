import webpack from "webpack";
import webpackStream from "webpack-stream";
import babel from "gulp-babel";

export const scriptsDev = () => {
  return app.gulp
    .src(app.path.src.js)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCRIPTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.init()))
    .pipe(babel())
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};

export const scriptsLibs = () => {
  return app.gulp
    .src(app.path.src.jsLibs)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCRIPTS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.init()))
    .pipe(
      webpackStream({
        mode: app.isBuild ? "production" : "development",
        entry: {
          vendor: `./src/js/vendor.js`,
        },
        output: {
          filename: "[name].js",
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: "babel-loader",
              options: {
                presets: ["@babel/env"],
              },
            },
          ],
        },
        optimization: {
          minimize: !app.isDev,
        },
      })
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.sourcemaps.write()))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
