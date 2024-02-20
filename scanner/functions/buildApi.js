function buildApi() {
  uuid = 0;

  return gulp
    .src('src/*.js')
    .pipe(
      livingcss('docs/api', {
        loadcss: false,
        template: 'docs/template/template.hbs',
        tags: { ...tags },
        preprocess: livingcssPreprocess
      })
    )
    .pipe(gulp.dest('docs/api'));
}