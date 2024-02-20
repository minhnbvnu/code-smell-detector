function syncEnv(pm) {
    var auth = pm.env.TEST_STRONGLOOP_PM_HTTP_AUTH || '';
    auth += auth.length > 0 ? '@' : '';
    pm.pmurl = fmt('http://%s127.0.0.1:%d', auth, pm.port);
    pm.pmurlNoAuth = fmt('http://127.0.0.1:%d', pm.port);
    pm.pmctlUrl = fmt('http://%s127.0.0.1:%d/api', auth, pm.port);
    pm.pmctlUrlNoAuth = fmt('http://127.0.0.1:%d/api', pm.port);
    pm.pmctlPath = path.resolve(pm.cwd, 'pmctl');
    pm.env.STRONGLOOP_PM = pm.pmurl;
    pm.env.STRONGLOOP_PM_NOAUTH = pm.pmurlNoAuth;

    // So pmctl, with no further config, can connect to an ephemeral pm port.
    process.env.STRONGLOOP_PM = pm.pmurl;
  }