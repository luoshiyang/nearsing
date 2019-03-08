var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();

// gulp.task('hello',function(){
//     console.log('hello luoshiyang!');
// });

gulp.task('sass',function(){
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(bs.reload({
        stream: true
    }))
});

gulp.task('bs',function(){
    bs.init({
        server: './src'
    });
});

gulp.task('pagereload',function(){
    bs.reload('./*.html');
});

gulp.task('watch',['bs','sass','pagereload'],function(){
    //监听sass文件
    gulp.watch('src/scss/**/*.scss',['sass']);
    //监听根目录下所有的html文件
    gulp.watch('src/**/*.html',['pagereload']);
    //监听根目录下所有的html文件
    gulp.watch('src/**/*.js',['pagereload']);
});