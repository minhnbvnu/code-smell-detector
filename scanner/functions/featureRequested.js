function featureRequested(name) {
  sendFeatureMetric(`vscode_${name}_requested`);
}