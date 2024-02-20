function buildModule() {
  return rollup({
    input: './src/kontra.js',
    output: {
      format: 'es',
      strict: false,
      banner: headerComment
    }
  })
    .pipe(source('kontra.mjs'))
    .pipe(gulp.dest('.'));
}