function writeSeedEnvironment(options, callback) {
  options.pmEnv = options.pmEnv || '';
  debug('extracting from: %j', options.pmEnv);
  options.pmEnv
    .split(/\s+/)
    .map(trim)
    .forEach(function(pair) {
      var kv = pair.split('=', 2);
      options.pmSeedEnv[kv[0]] = kv[1];
    });

  if (Object.keys(options.pmSeedEnv).length > 0) {
    options.pmEnvFile = path.resolve(options.pmBaseDir, 'env.json');
    return writeEnv(options.pmSeedEnv, options.pmEnvFile, callback);
  }

  return setImmediate(callback);

  function trim(s) {
    return s.trim();
  }

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
}