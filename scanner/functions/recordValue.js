function recordValue(agent, metric, value) {
  const stats = agent.metrics.getOrCreateMetric(metric)
  stats.recordValue(value)
  logger.trace('Recorded metric %s: %j', metric, value)
}