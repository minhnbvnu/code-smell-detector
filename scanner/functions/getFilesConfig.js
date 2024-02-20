function getFilesConfig() {
  if (process.env.USE_STATIC_TESTS) {
    return ['../tmp/tests.js']
  } else if (process.env.TEST_BENCHMARK) {
    return ['../node_modules/moment/moment.js', '../benchmark.js']
  } else {
    return ['../test.js']
  }
}