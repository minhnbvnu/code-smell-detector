function skipRun(dir, env, cmd) {
  return function(done) {
    debug('dir %j: skipping `%j`...', dir, cmd);
    setImmediate(done);
  };
}