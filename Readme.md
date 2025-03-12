# Project Setup & Deployment Guide

## 🚀 Project Overview

This project is a responsive web application built with **Tailwind CSS, Gulp, and JavaScript**. Follow the instructions below to set up and run the project locally or deploy it.

## 📌 Live Demo

[Live Website](https://portfolio-themefisher-project.netlify.app)

## 📂 Project Structure

```
project-root/
├── dist/                # Compiled files (output directory)
├── src/                 # Source files
│   ├── css/             # Tailwind CSS source
│   ├── script/          # JavaScript files
│   ├── assets/images/   # Images and other assets
├── gulpfile.js          # Gulp configuration
├── tailwind.config.js   # Tailwind CSS config
├── package.json         # Node dependencies
├── index.html           # Main HTML file
```

## 🛠️ Installation & Setup

### 1️⃣ Install Dependencies

Ensure you have **Node.js** installed. Then, run:

```sh
npm install
```

### 2️⃣ Run Development Server

Use Gulp to start a local development server with live reload:

```sh
npx gulp
```

### 3️⃣ Build for Production

To generate the final optimized files in the `dist/` folder, run:

```sh
npx gulp build
```

## 🔧 Gulp Tasks

```js
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

// Compile Tailwind CSS
gulp.task("styles", function (done) {
  gulp.src("src/css/styles.css")
    .pipe(postcss([tailwindcss, autoprefixer]))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
  done();
});

// Copy HTML files to `dist/`
gulp.task("html", function (done) {
  gulp.src("./*.html")
    .pipe(gulp.dest("dist"));
  done();
});

// Copy images
gulp.task("images", function () {
  return gulp.src("src/assets/images/**/*.*")
    .pipe(gulp.dest("dist/assets/images"));
});

// Copy JavaScript files
gulp.task("scripts", function (done) {
  gulp.src("src/script/**/*.js")
    .pipe(gulp.dest("dist/script"));
  done();
});

// Serve with live reload
gulp.task("serve", function (done) {
  browserSync.init({
    server: { baseDir: "./dist" },
  });
  gulp.watch("src/css/**/*.css", gulp.series("styles"));
  gulp.watch("src/script/**/*.js", gulp.series("scripts")).on("change", browserSync.reload);
  gulp.watch("./*.html", gulp.series("html")).on("change", browserSync.reload);
  done();
});

// Default task (for development)
gulp.task("default", gulp.series("styles", "scripts", "html", "images", "serve"));

// Build task (for production deployment)
gulp.task("build", gulp.series("styles", "scripts", "html", "images"));
```

## 🌎 Deployment

The project is hosted on **Netlify**. To deploy:

1. Push the latest changes to GitHub.
2. Connect your GitHub repository to Netlify.
3. Set `dist/` as the deploy directory.

Alternatively, you can deploy manually using:

```sh
npx gulp build
```

Then upload the `dist/` folder to your hosting provider.

## 📖 Additional Notes

- Ensure **Node.js** and **Gulp** are installed.
- Always run `npx gulp build` before deploying.
- If issues arise, check the browser console and inspect network requests.

---

Made with ❤️ by [Arafat Hosen]

