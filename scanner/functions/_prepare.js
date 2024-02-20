function _prepare(dir, env, callback) {
  debug('running %j in %j', COMMANDS, dir);

  var functions = COMMANDS.map(function(cmd) {
    if (process.env.STRONGLOOP_PM_SKIP_DEFAULT_INSTALL) {
      return skipRun(dir, env, cmd);
    }
    return run(dir, env, cmd);
  });

  return async.series(functions, callback);
}