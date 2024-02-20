function measureMilliseconds(name, scope, duration, exclusive) {
  const stats = this.getOrCreateMetric(name, scope)
  stats.recordValueInMillis(duration, exclusive)
  return stats
}