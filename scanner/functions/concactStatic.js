function concactStatic (modulePath, config, cb) {
  var streamArr = [];
  var staticPath = require(path.join(modulePath, 'static-conf')).staticPath;
  if (_.isEmpty(staticPath)) {
    cb();
    return;
  }
  for (var key in staticPath) {
    // css
    if (path.extname(key).indexOf('css') >= 0) {
      streamArr.push(vinylFs
        .src(staticPath[key].map(function (item) {
          return path.join(modulePath, config.dest, '_', item);
        }))
        .pipe(concatCore(key))
        .pipe(vinylFs.dest(path.join(modulePath, config.dest, '_static', 'static', 'css'))));
    }

    // js
    if (path.extname(key).indexOf('js') >= 0) {
      streamArr.push(vinylFs
        .src(staticPath[key].map(function (item) {
          return path.join(modulePath, config.dest, '_', item);
        }))
        .pipe(concatCore(key))
        .pipe(vinylFs.dest(path.join(modulePath, config.dest, '_static', 'static', 'js'))));
    }
  }
  es.merge(streamArr).on('end', function () {
    cb();
  });
}