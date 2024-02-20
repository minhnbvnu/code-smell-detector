function pmWithApp(args, env, callback) {
  if (typeof env === 'function') {
    callback = env;
    env = {};
  }
  assert.equal(typeof callback, 'function');
  reset(function() {
    pm(args, env, function(pm) {
      console.log('pmurl: %s', pm.pmurl);
      cp.exec(fmt('node "%s" %s master', slDeploy, pm.pmurl), function(er) {
        assert.ifError(er, 'git push succeeds when auth not required');
        callback(pm);
      });
    });
  });
}