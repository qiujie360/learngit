var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    jsconcat = require('gulp-concat'),
    cssmin = require('gulp-clean-css'),
    imgmin = require('gulp-imagemin'),
    jsmin = require('gulp-uglify');
//定义一个jscmin任务（js的合并压缩）
gulp.task('jscmin', function () {
    gulp.src('./client/js-new/{app,controllers,rest-services.js}.js') //该任务针对的文件
        .pipe(jsconcat('scripts.js')) //该任务调用的模块
        .pipe(jsmin()) //该任务调用的模块
        .pipe(gulp.dest('./client/js-new')); //将会在client/js下生成scripts.js
});
//定义一个jscmin任务（js的合并压缩）
gulp.task('cssmin', function () {
    gulp.src('./client/css/style-new.css') //该任务针对的文件
        .pipe(jsconcat('style-new.min.css')) //该任务调用的模块
        .pipe(cssmin()) //该任务调用的模块
        .pipe(gulp.dest('./client/css')); //将会在css下生成wxact.min.css
});

//定义一个imgmin任务（js的合并压缩）
gulp.task('imgmin', function () {
    gulp.src('./client/images/**/*.{png,jpg,gif,ico}') //任务针对的文件
        .pipe(imgmin()) //该任务调用的模块
        .pipe(gulp.dest('./client/imagesMin')); //将会在css下生成wxact.min.css
});

gulp.task('default', ['jscmin','cssmin']);