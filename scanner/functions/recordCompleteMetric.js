function recordCompleteMetric(agent, metricName, metric) {
  const stats = agent.metrics.getOrCreateMetric(metricName)
  stats.merge(metric)
  logger.trace('Recorded metric %s: %j', metricName, metric)
}