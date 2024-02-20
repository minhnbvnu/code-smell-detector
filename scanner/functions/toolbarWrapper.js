function toolbarWrapper(component) {
  component.toolbars = {};

  component.toolbar = function (name, config) {
    registerToolbar(component.toolbars, name, config);
  };

  Object.keys(defaultToolbars).forEach((key) => {
    const module = defaultToolbars[key];
    const { default: config } = module;

    component.toolbar(config.name, config);
  });
}