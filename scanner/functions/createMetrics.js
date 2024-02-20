function createMetrics(metrics) {
  const modules = Object.keys(uninstrumented)
  if (modules.length > 0) {
    metrics.getOrCreateMetric(NAMES.SUPPORTABILITY.UNINSTRUMENTED).incrementCallCount()
  }

  modules.forEach(function addMetrics(module) {
    metrics
      .getOrCreateMetric(NAMES.SUPPORTABILITY.UNINSTRUMENTED + '/' + uninstrumented[module].name)
      .incrementCallCount()
  })
}