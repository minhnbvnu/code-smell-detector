function verifyMetrics(t, agent) {
  for (const [metricName, expectedCount] of Object.entries(expectedUpsertMetrics)) {
    const metric = agent.metrics.getMetric(metricName)
    t.equal(
      metric.callCount,
      expectedCount,
      `should have counted ${metricName} ${expectedCount} times`
    )
  }
}