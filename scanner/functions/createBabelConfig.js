function createBabelConfig(configItems) {
  const config = createConfig(configItems, 'babel', features);
  return config === '{}' ? null : config;
}