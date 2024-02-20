function createWebpackConfigExportStatement(configItems) {
  const hotReloadModifier = createHotReloadModifier(configItems);
  if (!hotReloadModifier) {
    return `config`;
  }

  return `(env, argv) => {
  ${hotReloadModifier}
  return config;
}`;
}