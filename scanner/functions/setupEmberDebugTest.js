function setupEmberDebugTest(hooks, options = {}) {
  let app, originalApp, originalPort, originalIgnoreDeprecations;

  hooks.beforeEach(async function () {
    originalPort = EmberDebug.Port;
    originalApp = getApplication();
    originalIgnoreDeprecations = EmberDebug.IGNORE_DEPRECATIONS;

    app = Application.create({
      ...config.APP,
      modulePrefix: config.modulePrefix,
      Resolver,
    });
    setApplication(app);

    await setupContext(this);
    await setupApplicationContext(this);

    const Router = EmberRouter.extend({
      location: 'none',
    });

    if (options.routes) {
      Router.map(options.routes);
    } else {
      Router.map(function () {
        this.route('simple');
      });

      this.owner.register('template:simple', hbs`Simple template`);
    }

    this.owner.register('router:main', Router);
    this.owner.register('service:adapter', BasicAdapter);

    run(() => {
      EmberDebug.isTesting = true;
      EmberDebug.owner = this.owner;
    });

    EmberDebug.Port =
      options.Port ||
      class extends Port {
        init() {}
        send() {}
      };

    run(EmberDebug, 'start');
  });

  hooks.afterEach(async function () {
    EmberDebug.destroyContainer();
    EmberDebug.clear();

    await teardownContext(this);

    EmberDebug.IGNORE_DEPRECATIONS = originalIgnoreDeprecations;

    run(() => {
      EmberDebug.isTesting = false;
    });

    EmberDebug.Port = originalPort;

    setApplication(originalApp);

    run(app, 'destroy');
  });
}