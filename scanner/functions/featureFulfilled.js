function featureFulfilled(name) {
  sendFeatureMetric(`vscode_${name}_fulfilled`);
}