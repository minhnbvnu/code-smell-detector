function distIife() {
  return gulp
    .src('kontra.js')
    .pipe(preprocess({ context }))
    .pipe(plumber())
    .pipe(terser())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./docs/assets/js'))
    .pipe(rename('kontra.min.js'))
    .pipe(
      size({
        showFiles: true
      })
    )
    .pipe(
      size({
        showFiles: true,
        gzip: true
      })
    )
    .pipe(gulp.dest('.'));
}