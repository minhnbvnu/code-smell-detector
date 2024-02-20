function buildDeclarationFile() {
  return gulp
    .src('./kontra.js')
    .pipe(
      livingcss('./', {
        loadcss: false,
        template: './tasks/ts-template.hbs',
        tags: { ...tags },
        preprocess: livingcssPreprocess
      })
    )
    .pipe(rename('kontra.d.ts'))
    .pipe(gulp.dest('./'));
}