function recordSourceMapMetric(agent) {
  const isSourceMapsEnabled = process.execArgv.includes('--enable-source-maps')
  if (isSourceMapsEnabled) {
    agent.metrics.getOrCreateMetric(NAMES.FEATURES.SOURCE_MAPS).incrementCallCount()
  }
}