// for typescript
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json')

// for scss
const { src, dest, watch, series} =  require ('gulp')
const sass = require ('gulp-sass')(require('sass'))

// Compile Scss
function buildStyles() {
    return src('./scssFile/style.scss')
        .pipe(sass())
        .pipe(dest('css'))
}

// compile ts 
function buildTs(){
    return gulp.src("./tsFile/*.ts")
        .pipe(tsProject())
        .js.pipe(dest('./jsFiles'))
}

function watchTask() {
    watch(['./scssFile/style.scss'], buildStyles)
    watch(['./tsFile/*.ts'], buildTs)
}

exports.default = series(buildStyles, buildTs, watchTask)