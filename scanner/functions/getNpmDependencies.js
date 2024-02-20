function getNpmDependencies(featureConfig, configItems) {
  const dependencies = flow(
    reduce((acc, currentValue) => {
      return concat(
        acc,
        featureConfig.features[currentValue].dependencies(configItems)
      );
    }, get(featureConfig, 'base.dependencies') || []),
    uniq()
  )(configItems);

  const devDependencies = flow(
    reduce(
      (acc, currentValue) =>
        _.concat(
          acc,
          featureConfig.features[currentValue].devDependencies(configItems)
        ),
      _.get(featureConfig, 'base.devDependencies', [])
    ),
    uniq()
  )(configItems);

  return {
    dependencies,
    devDependencies,
  };
}