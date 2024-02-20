function shouldGenerateSpanEvents(config, txn) {
  if (!config.distributed_tracing.enabled) {
    return false
  }
  if (!config.span_events.enabled) {
    return false
  }

  const infiniteTracingConfigured = Boolean(config.infinite_tracing.trace_observer.host)
  return infiniteTracingConfigured || txn.sampled
}