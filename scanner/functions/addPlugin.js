function addPlugin(webpackConfig, plugin) {
  if (!webpackConfig.plugins) {
    return { ...webpackConfig, plugins: [plugin] };
  }
  return { ...webpackConfig, plugins: _.concat(webpackConfig.plugins, plugin) };
}