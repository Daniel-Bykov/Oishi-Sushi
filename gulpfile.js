let project_folder = "dist",
  source_folder = "src",

  path = {

    build: {
      html: project_folder + "/",
      css: project_folder + "/assets/styles/",
      js: project_folder + "/assets/js/",
      img: project_folder + "/assets/img/",
      fonts: project_folder + "/assets/fonts/",
    },

    src: {
      html: [source_folder + "/*.html", "!" + source_folder + "/~*.html"],
      css: [source_folder + "/assets/styles/style.scss", source_folder + "/assets/styles/reset.css"],
      js: [source_folder + "/assets/js/script.js", source_folder + "/assets/js/*.js"],
      img: source_folder + "/assets/img/**/*.{jpg,png,svg,ico,webp}",
      fonts: source_folder + "/assets/fonts/*.otf"
    },

    watch: {
      html: source_folder + "/**/*.html",
      css: source_folder + "/assets/styles/*.scss",
      js: source_folder + "/assets/js/**/*.js",
      img: source_folder + "/assets/img/**/*.{jpg,png,svg,ico,webp}",
    },

    clean: "./" + project_folder + "/"
  }

const { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  sass = require('gulp-dart-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2');


function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  });
  done();
}


function images() {
  return src(path.src.img)
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: true }],
      optimizationLevel: 5
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function fonts(done) {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));

  src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))

  done();
}


function sassComp(done) {
  src(path.src.css)
    .pipe(sass().on('error', sass.logError))
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overridebrowserlist: ["last 5 version"],
        cascede: true
      })
    )
    .pipe(clean_css())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(path.build.css))

  browsersync.reload();
  done();

}

function watchFiles(done) {

  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], sassComp)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)

  done();
}

function clean() {
  return del([path.clean]);
}

let build = gulp.series(clean, gulp.parallel(js, sassComp, html, images, fonts));
let watch = gulp.series(build, watchFiles, browserSync);

exports.build = build;
exports.watch = watch;
exports.default = watch;












































// const mustache = require("gulp-mustache"),
//   gulp = require('gulp'),
//   data = require('./data.js'),
//   del = require('del'),
//   sass = require('gulp-dart-sass'),
//   browsersync = require("browser-sync").create();

// function htmlMustache() {
//   return gulp.src("./src/*.html")
//     .pipe(mustache(data))
//     .pipe(gulp.dest("./dist"));
// }

// function clean() {
//   return del(['./dist/header.html']);
// }


// function scssComp() {
//   return gulp.src('./src/assets/styles/*.scss')

//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./dist/css'));
// }



// // BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }

// function watchFiles() {
//   gulp.watch("./src/assets/styles/*", scssComp);

//   gulp.watch([
//     "./src/templates/**/*.html",
//     "./src/*.html"
//   ],  gulp.series(htmlMustache, clean, browserSyncReload));
// }

// exports.build = gulp.series(htmlMustache, scssComp, clean);
// exports.dev = gulp.parallel(watchFiles, browserSync);