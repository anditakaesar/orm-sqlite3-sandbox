var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');

function build(cb) {
    cleanBuildDir();
    buildJs();
    cb();
}

function cleanBuildDir() {
    return del(['./build/**/*js'], { force: true });
}

function buildJs() {
    return gulp.src([
        './src/**/*.js', 
        '!./migrations/*.js',
        '!./seeders/*.js'
    ])
    .pipe(babel())
    .pipe(gulp.dest('./build'));
}

exports.default = build;