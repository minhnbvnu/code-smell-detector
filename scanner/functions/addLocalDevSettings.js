function addLocalDevSettings(config, exampleDir) {
  const LOCAL_DEV_CONFIG = makeLocalDevConfig(exampleDir);
  config = Object.assign({}, LOCAL_DEV_CONFIG, config);
  config.resolve = Object.assign({}, LOCAL_DEV_CONFIG.resolve, config.resolve || {});
  config.resolve.alias = config.resolve.alias || {};
  Object.assign(config.resolve.alias, LOCAL_DEV_CONFIG.resolve.alias);

  config.module = config.module || {};
  Object.assign(config.module, {
    rules: (config.module.rules || []).concat(LOCAL_DEV_CONFIG.module.rules)
  });

  const babelLoader = config.module.rules.find(rule => rule.loader === 'babel-loader');
  if (babelLoader) {
    babelLoader.options.presets = [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-flow'
    ];
  }
  return config;
}