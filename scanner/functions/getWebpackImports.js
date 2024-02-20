function getWebpackImports(configItems) {
  return _.reduce(
    configItems,
    (acc, currentValue) => _.concat(acc, features[currentValue].webpackImports),
    []
  );
}