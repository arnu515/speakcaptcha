const { series, src, dest, watch } = require("gulp")
const rmrf = require("rimraf")
const postcss = require("gulp-postcss")

function clean(cb) {
  rmrf("backend/static/*", cb)
}

function css() {
  return src("backend/assets/**/*.css")
    .pipe(postcss())
    .pipe(dest("backend/static"))
}

const task = series(
  clean,
  css
)

function dev() {
  watch(["backend/**/*.{css,py,js,html}", "!backend/static/**/*"], task) 
}

module.exports = {
  dev,
  default: task
}

