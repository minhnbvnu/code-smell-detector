function buildIife() {
  return rollup({
    input: './src/kontra.defaults.js',
    output: {
      format: 'iife',
      name: 'kontra',
      strict: false,
      banner: headerComment
    }
  })
    .pipe(source('kontra.js'))
    .pipe(gulp.dest('.'))
    .pipe(gulp.dest('./docs/assets/js'));
}