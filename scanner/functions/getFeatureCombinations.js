function getFeatureCombinations(features) {
  const allFeatures = _.keys(features);
  const notSupportedFeatures = [];

  const featuresCombinations = _.reject(allFeatures, feature =>
    _.includes(notSupportedFeatures, feature)
  );

  return combinations(featuresCombinations);
}