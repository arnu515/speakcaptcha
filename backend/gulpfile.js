const { series, parallel, src, dest, watch } = require("gulp")
const rmrf = require("rimraf")
const postcss = require("gulp-postcss")
const browserify = require("gulp-browserify")
const uglify = require("gulp-uglify")

function clean(cb) {
  rmrf("backend/static/*", cb)
}

function css() {
  return src("backend/assets/**/*.css")
    .pipe(postcss())
    .pipe(dest("backend/static"))
}

function js() {
  return src("backend/assets/**/*.js")
    .pipe(browserify({ transform: ["babelify"] }))
    .pipe(uglify())
    .pipe(dest("backend/static"))
}

const task = series(
  clean,
  parallel(css, js)
)

async function dev() {
  await task()
  watch(["backend/**/*.{css,py,js,html}", "!backend/static/**/*"], task)
}

module.exports = {
  dev,
  default: task
}

