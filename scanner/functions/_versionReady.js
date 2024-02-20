async function _versionReady(app) {
  // clear keys
  await clearFn(app);

  // run startups: not after
  for (const startup of app.meta.startupsArray) {
    if (!startup.config.disable && !startup.config.instance && startup.config.after !== true) {
      console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
      await app.meta._runStartup({ module: startup.module, name: startup.name });
    }
  }

  // appReady
  app.meta.appReady = true;
  app.meta.appReadyInstances = {};

  // run startups: after
  for (const startup of app.meta.startupsArray) {
    if (!startup.config.disable && !startup.config.instance && startup.config.after === true) {
      console.log(`---- startup: ${startup.key}, pid: ${process.pid}`);
      await app.meta._runStartup({ module: startup.module, name: startup.name });
    }
  }

  // version init
  if (app.meta.isTest || app.meta.isLocal) {
    // subdomain
    const subdomain = '';
    // init
    await app.meta.util.executeBean({
      subdomain,
      beanModule: 'a-instance',
      beanFullName: 'instance',
      context: { subdomain },
      fn: 'instanceStartup',
    });
  }

  // version test
  if (app.meta.isTest) {
    // subdomain
    const subdomain = '';
    // test
    await app.meta.util.executeBean({
      subdomain,
      beanModule: 'a-version',
      beanFullName: 'a-version.local.version',
      context: subdomain,
      fn: '__instanceTest',
    });
  }
}