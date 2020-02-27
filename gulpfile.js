let gulp     = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    htmlmin  = require('gulp-htmlmin');

gulp.task('pack-css',()=>{
  return gulp.src(['public/css/style.css'])
      .pipe(cleanCss())
  .pipe(gulp.dest('./minified/css'));
})

gulp.task('watch', ()=>{
  gulp.watch('./public/*')
})

gulp.task('pages',()=>{
  return gulp.src(['./views/*'])
  .pipe(htmlmin({
    collapseWhiteSpace:true,
    removeComments:true
  }))
  .pipe(gulp.dest('./minified/html'));
});

gulp.task('default', gulp.parallel('pack-css', 'pages',  'watch', (done)=>{
  done()
}));

