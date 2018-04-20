var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(); //laver (create) en instans af det

gulp.task('styles', function() {
    gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer())
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