function generateLoggingSupportMetrics(agent) {
  const loggingConfig = agent.config.application_logging
  const logNames = NAMES.LOGGING

  const configKeys = ['metrics', 'forwarding', 'local_decorating']
  configKeys.forEach((configValue) => {
    const configFlag =
      loggingConfig.enabled && loggingConfig[`${configValue}`].enabled ? 'enabled' : 'disabled'
    const metricName = logNames[`${configValue.toUpperCase()}`]
    agent.metrics.getOrCreateMetric(`${metricName}${configFlag}`).incrementCallCount()
  })
}