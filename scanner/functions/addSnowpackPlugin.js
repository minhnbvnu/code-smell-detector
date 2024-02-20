function addSnowpackPlugin(snowpackConfig, plugin) {
  if (!snowpackConfig || !snowpackConfig.plugins) {
    return {
      ...snowpackConfig,
      plugins: [plugin],
    };
  }

  return {
    ...snowpackConfig,
    plugins: _.union(snowpackConfig.plugins, [plugin]),
  };
}