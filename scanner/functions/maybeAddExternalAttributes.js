function maybeAddExternalAttributes(transaction, attributes) {
  const metric = transaction.metrics.getMetric(NAMES.EXTERNAL.ALL)

  if (metric) {
    attributes.externalDuration = metric.total
    attributes.externalCallCount = metric.callCount
  }
}