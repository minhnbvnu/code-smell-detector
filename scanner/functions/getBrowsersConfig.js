function getBrowsersConfig() {
  if (process.env.TEST_CROSS_BROWSER) {
    return Object.keys(sauceLabsLaunchers)
  } else if (process.env.TEST_BENCHMARK) {
    return ['PhantomJS']
  } else if (process.env.TRAVIS) {
    return Object.keys(travisLaunchers)
  } else {
    return Object.keys(localLaunchers)
  }
}