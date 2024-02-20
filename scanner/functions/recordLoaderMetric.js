function recordLoaderMetric(agent) {
  let isDashR = false

  process.execArgv.forEach((arg, index) => {
    if (arg === '-r' && process.execArgv[index + 1] === 'newrelic') {
      agent.metrics.getOrCreateMetric(NAMES.FEATURES.CJS.PRELOAD).incrementCallCount()
      isDashR = true
    } else if (
      (arg === '--loader' || arg === '--experimental-loader') &&
      process.execArgv[index + 1] === 'newrelic/esm-loader.mjs'
    ) {
      if (isESMSupported) {
        agent.metrics.getOrCreateMetric(NAMES.FEATURES.ESM.LOADER).incrementCallCount()
      } else {
        agent.metrics.getOrCreateMetric(NAMES.FEATURES.ESM.UNSUPPORTED_LOADER)
        logger.warn(
          'New Relic for Node.js ESM loader requires a version of Node >= v16.12.0; your version is %s.  Instrumentation will not be registered.',
          process.version
        )
      }
    }
  })

  if (!isDashR) {
    agent.metrics.getOrCreateMetric(NAMES.FEATURES.CJS.REQUIRE).incrementCallCount()
  }
}