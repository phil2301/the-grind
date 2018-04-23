var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),
    maps            = require('gulp-sourcemaps'),
    browserSync     = require('browser-sync').create(); //laver (create) en instans af det

gulp.task('styles', function() {
    gulp.src('./scss/style.scss')
        .pipe(plumber ({ errorHandler : (err) => {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message: err.toString()
            })(err);
        }}))
        .pipe(maps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(maps.write("./"))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', ['styles']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);

});

gulp.task('default', ['styles', 'serve']);