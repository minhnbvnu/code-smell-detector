function distModule() {
  return gulp
    .src('kontra.mjs')
    .pipe(preprocess({ context }))
    .pipe(plumber())
    .pipe(terser())
    .pipe(plumber.stop())
    .pipe(rename('kontra.min.mjs'))
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