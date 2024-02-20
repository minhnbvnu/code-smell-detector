function watch() {
  gulp.watch(paths.styles.src, gulp.series(css, reload))
  gulp.watch(paths.html.src).on('change', browserSync.reload)
}