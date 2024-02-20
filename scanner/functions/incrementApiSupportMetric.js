function incrementApiSupportMetric(metrics, functionName) {
  if (!metrics) {
    logger.warnOnce(
      'Cannot add TransactionHandle API support metric. The metrics collection is missing.'
    )
    return
  }

  const metric = metrics.getOrCreateMetric(
    NAMES.SUPPORTABILITY.TRANSACTION_API + '/' + functionName
  )

  metric.incrementCallCount()
  return metric
}