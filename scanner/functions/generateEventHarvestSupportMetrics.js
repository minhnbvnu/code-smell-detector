function generateEventHarvestSupportMetrics(agent, harvestConfig) {
  const harvestLimits = harvestConfig.harvest_limits

  const harvestNames = NAMES.EVENT_HARVEST
  const harvestLimitNames = harvestNames.HARVEST_LIMIT

  const reportPeriodMetric = agent.metrics.getOrCreateMetric(harvestNames.REPORT_PERIOD)
  reportPeriodMetric.recordValue(harvestConfig.report_period_ms)

  const analyticLimit = harvestLimits.analytic_event_data
  if (analyticLimit) {
    const analyticLimitMetric = agent.metrics.getOrCreateMetric(harvestLimitNames.ANALYTIC)
    analyticLimitMetric.recordValue(analyticLimit)
  }

  const customLimit = harvestLimits.custom_event_data
  if (customLimit) {
    const customLimitMetric = agent.metrics.getOrCreateMetric(harvestLimitNames.CUSTOM)
    customLimitMetric.recordValue(customLimit)
  }

  const errorLimit = harvestLimits.error_event_data
  if (errorLimit) {
    const errorLimitMetric = agent.metrics.getOrCreateMetric(harvestLimitNames.ERROR)
    errorLimitMetric.recordValue(errorLimit)
  }

  const spanLimit = harvestLimits.span_event_data
  if (spanLimit) {
    const spanLimitMetric = agent.metrics.getOrCreateMetric(harvestLimitNames.SPAN)
    spanLimitMetric.recordValue(spanLimit)
  }

  const logLimit = harvestLimits.log_event_data
  if (logLimit) {
    const logLimitMetric = agent.metrics.getOrCreateMetric(harvestLimitNames.LOG)
    logLimitMetric.recordValue(logLimit)
  }
}