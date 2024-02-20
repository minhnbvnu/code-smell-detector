function writeEnv(env, path, cb) {
    debug('setting seed env: %j', env);
    var store = new Environment(path);
    for (var k in env) {
      store.set(k, env[k]);
    }
    if (options.dryRun) {
      console.log('Would seed environment with: %j', env);
      return cb();
    } else {
      options._touched.push(path);
      store.save(cb);
    }
  }