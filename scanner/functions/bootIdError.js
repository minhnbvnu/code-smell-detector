function bootIdError() {
    agent.metrics.getOrCreateMetric(NAMES.UTILIZATION.BOOT_ID_ERROR).incrementCallCount()
  }