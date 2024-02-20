function getReportersConfig() {
  if (process.env.TEST_CROSS_BROWSER) {
    return ['dots', 'saucelabs', 'count']
  } else if (process.env.TEST_BENCHMARK) {
    return ['benchmark', 'benchmark-json']
  } else if (process.env.COVERAGE_REPORT) {
    return ['coverage-istanbul']
  } else {
    return ['mocha', 'count']
  }
}