function buildServiceWorker() {
  const staticCacheName = /kontra-docs-v([\d.]+)/;

  return gulp
    .src('docs/service-worker.js')
    .pipe(replace(staticCacheName, (match, p1) => {
      return match.replace(p1, pkg.version);
    }))
    .pipe(gulp.dest('docs'));
}