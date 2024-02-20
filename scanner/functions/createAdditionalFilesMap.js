function createAdditionalFilesMap(featureConfig, configItems) {
  const filesFromFeatures = _.reduce(
    configItems,
    (acc, currentValue) =>
      _.assign(acc, featureConfig.features[currentValue].files(configItems)),
    {}
  );
  return _.assign(featureConfig.base.files(configItems), filesFromFeatures);
}