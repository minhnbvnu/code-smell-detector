function maybeAddDatabaseAttributes(transaction, attributes) {
  const metric = transaction.metrics.getMetric(NAMES.DB.ALL)

  if (metric) {
    attributes.databaseDuration = metric.total
    attributes.databaseCallCount = metric.callCount
  }
}