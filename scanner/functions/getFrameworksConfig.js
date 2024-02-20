function getFrameworksConfig() {
  if (process.env.TEST_BENCHMARK) {
    return ['benchmark']
  } else {
    return ['mocha']
  }
}