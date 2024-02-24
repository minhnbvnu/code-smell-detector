function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes.autoboot = true;
  attributes = merge(attributes, attrs); // use defaults, but you can override;

    return run(() => {
        let application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
        return application;
    });
}