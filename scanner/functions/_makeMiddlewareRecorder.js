function _makeMiddlewareRecorder(_shim, metricName) {
  return function middlewareMetricRecorder(segment, scope) {
    const duration = segment.getDurationInMillis()
    const exclusive = segment.getExclusiveDurationInMillis()
    const transaction = segment.transaction

    if (scope) {
      transaction.measure(metricName, scope, duration, exclusive)
    }
    transaction.measure(metricName, null, duration, exclusive)
  }
}