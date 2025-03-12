const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

// Compile Tailwind CSS
gulp.task("styles", function (done) {
  gulp
    .src("src/css/styles.css")
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
  done();
});


// Copy HTML files to `dist/`
gulp.task("html", function (done) {
  gulp.src("./*.html") // Selects all HTML files in the root directory
    .pipe(gulp.dest("dist")); // Moves them to the `dist` folder
  done();
});

gulp.task("images", function () {
  return gulp.src("src/assets/images/**/*.*", { encoding: false }) // Select images without modifying encoding
    .pipe(gulp.dest("dist/assets/images")); // Copy them directly
});

// Copy JavaScript files to `dist/`
gulp.task("scripts", function (done) {
  gulp.src("src/script/**/*.js") // Selects all JS files in `src/script`
    .pipe(gulp.dest("dist/script")); // Moves them to `dist/script`
  done();
});

// Serve with live reload
gulp.task("serve", function (done) {
  browserSync.init({
    server: {
      baseDir: "./dist", // Serve from `dist`
    },
  });

  // gulp.watch("src/css/**/*.css", gulp.series("styles"));
  // gulp.watch("./*.html", gulp.series("html")).on("change", browserSync.reload);
  // done();
  gulp.watch("src/css/**/*.css", gulp.series("styles"));
  gulp.watch("src/script/**/*.js", gulp.series("scripts")).on("change", browserSync.reload); // Watch JS changes
  gulp.watch("./*.html", gulp.series("html")).on("change", browserSync.reload);
  done();
});

// gulp.task("default", gulp.series("styles", "html", "images", "serve"));
// gulp.task("build", gulp.series("styles", "html", "images"));

// Default task (for development)
gulp.task("default", gulp.series("styles", "scripts", "html", "images", "serve"));

// Build task (for production deployment)
gulp.task("build", gulp.series("styles", "scripts", "html", "images"));



