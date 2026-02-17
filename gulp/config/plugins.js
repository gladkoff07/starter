import replace from "gulp-replace"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import browsersync from "browser-sync"
import newer from "gulp-newer"
import ifPlugin from "gulp-if"
import sourcemaps from "gulp-sourcemaps"
import changed from "gulp-changed"
import cached from "gulp-cached"
import remember from "gulp-remember"

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
  sourcemaps: sourcemaps,
  changed: changed,
  cached: cached,
  remember: remember,
}
