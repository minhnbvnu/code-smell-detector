function buildPackage(opts, isWatch, callback) {
  var compiler = webpack(opts);
  compiler.plugin('compile', function() {
    log.info('build', 'compile');
  });
  compiler.plugin('done', function(stats) {
    printResult(stats);
    log.info('build', 'done');

    if (callback) {
      callback();
    }
    callback = null;
  });
  if (isWatch) {
    compiler.watch(200, function () {
      //if (err) throw err;
    });
  } else {
    compiler.run(function() {
      //if (err) throw err;
    });
  }
}