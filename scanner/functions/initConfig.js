function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);

  initOptions(config);

  return config;
}