function getPreprocessorsConfig() {
  if (process.env.USE_STATIC_TESTS) {
    return { '../tmp/tests.js': ['sourcemap'] }
  } else if (process.env.TEST_BENCHMARK) {
    return { '../benchmark.js': ['webpack', 'sourcemap'] }
  } else {
    return { '../test.js': ['webpack', 'sourcemap'] }
  }
}