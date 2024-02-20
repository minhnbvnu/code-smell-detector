function resourcesConcat (opts) {
  var config = _.assign({
    cwd: undefined,
    module: undefined,
    dest: 'dist',
    end: function () {}
  }, opts);

  if (!config.cwd || !config.module) {
    gutil.log(gutil.colors.red('传入参数有误 at concat!'));
    return;
  }

  var modulePath = path.join(config.cwd, config.module);
  concactStatic(modulePath, config, function () {
    if (_.isFunction(opts.end)) {
      opts.end();
    }
  });
}