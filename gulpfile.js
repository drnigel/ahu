var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();


var proxyServer = "http://localhost/ahu",
    port = 3001;
// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    gulp.src("scss/style.scss")
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("css/"))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest("css/min/"))
        .pipe(browserSync.stream());
});

// Combines and minifiys all scripts into min folder & auto-inject into browsers
gulp.task('scripts', function() {
    return gulp.src("js/*.js")
        .pipe(plumber({
            handleError: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/min/'))
        .pipe(browserSync.stream());
});



// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {
    browserSync.init({
        proxy: proxyServer,
        port: port
    });
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch("*.json").on('change', browserSync.reload);
    gulp.watch('js/min/*.js').on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("css/*.css").on('change', browserSync.reload);

});



gulp.task('default', ['serve']);