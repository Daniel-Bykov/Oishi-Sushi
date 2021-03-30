const mustache = require("gulp-mustache"),
  gulp = require('gulp'),
  data = require('./data.js'),
  del = require('del'),
  sass = require('gulp-dart-sass'),
  browsersync = require("browser-sync").create();

function htmlMustache() {
  return gulp.src("./src/*.html")
    .pipe(mustache(data))
    .pipe(gulp.dest("./dist"));
}

function clean() {
  return del(['./dist/header.html']);
}


function scssComp() {
  return gulp.src('./src/assets/styles/*.scss')
    
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch("./src/assets/styles/*", scssComp);
  
  gulp.watch([
    "./src/templates/**/*.html",
    "./src/*.html"
  ],  gulp.series(htmlMustache, clean, browserSyncReload));
}

exports.build = gulp.series(htmlMustache, scssComp, clean);
exports.dev = gulp.parallel(watchFiles, browserSync);