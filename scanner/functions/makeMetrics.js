function makeMetrics(num) {
  const metrics = new Metrics(1, {}, {})

  for (let i = 0; i < num; ++i) {
    metrics.getOrCreateMetric(shared.getMetric(), shared.getMaybeUnscoped())
  }

  return metrics
}