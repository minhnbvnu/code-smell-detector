function maybeAddQueueAttributes(transaction, attributes) {
  const metric = transaction.metrics.getMetric(NAMES.QUEUETIME)

  if (metric) {
    attributes.queueDuration = metric.total
  }
}