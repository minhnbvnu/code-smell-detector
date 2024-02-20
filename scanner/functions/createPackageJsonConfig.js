function createPackageJsonConfig(featureConfig, configItems) {
  return _.reduce(
    configItems,
    (acc, currentValue) =>
      _.merge(acc, featureConfig.features[currentValue].packageJson),
    {}
  );
}