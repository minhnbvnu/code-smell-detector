function printResult(stats) {
  log.debug('stats', '\n' + stats.toString());

  var errors = stats.compilation.errors;
  if (errors && errors.length) {
    errors.forEach(function (err) {
      log.error('error', err.message);
    });
  }

  stats = stats.toJson();
  stats.assets.forEach(function(item) {
    var size = (item.size/1024.0).toFixed(2) + 'kB';
    log.info('generated', item.name, size.to.magenta.color);
  });
}