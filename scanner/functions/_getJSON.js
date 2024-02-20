function _getJSON(sample, trace, transaction, data) {
  return [
    transaction.getFullName(),
    transaction.url || '<unknown>',
    trace.id,
    getQuery(sample.tracer.config, trace),
    trace.metric,
    sample.callCount,
    sample.total,
    sample.min,
    sample.max,
    data
  ]
}