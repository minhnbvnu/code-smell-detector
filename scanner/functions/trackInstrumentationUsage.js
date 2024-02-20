function trackInstrumentationUsage(agent, shim, moduleName, metricPrefix) {
  try {
    const version = tryGetVersion(shim)
    const instrumentationMetricName = `${metricPrefix}/${moduleName}`

    agent.metrics.getOrCreateMetric(instrumentationMetricName).incrementCallCount()

    if (version) {
      const majorVersion = semver.major(version)
      const versionMetricName = `${instrumentationMetricName}/Version/${majorVersion}`

      agent.metrics.getOrCreateMetric(versionMetricName).incrementCallCount()
    }
  } catch (error) {
    logger.debug('Unable to track instrumentation usage for: ', moduleName, error)
  }
}