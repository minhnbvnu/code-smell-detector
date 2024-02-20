function createCodeWithMap(bundle, dev) {
  return {
    code: bundle.getSource({dev}),
    map: JSON.stringify(bundle.getSourceMap({dev})),
  };
}