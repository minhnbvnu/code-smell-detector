function createMockFeatureContext(opts = { userProperties: false}) {
  return {
    options: {
      userProperties: opts.userProperties
    },
    store: {
      featureChanged: spy()
    }
  };
}