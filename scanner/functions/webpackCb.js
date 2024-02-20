function webpackCb(err, stats) {
    webpackCompletion(err, stats)
    gulp.src(paths.build + '/' + lib)
      .pipe($.header(header, {
        version: process.env.npm_package_version
      }))
      .pipe(gulp.dest(paths.dist))
    return cb()
  }