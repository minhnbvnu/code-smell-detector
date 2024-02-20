function createStandardAggregator(config, agent) {
  logger.trace('Creating standard span event aggregator.')

  const opts = {
    periodMs: config.event_harvest_config.report_period_ms,
    limit: config.event_harvest_config.harvest_limits.span_event_data,
    config,
    enabled: (config) => config.distributed_tracing.enabled && config.span_events.enabled
  }

  return new SpanEventAggregator(opts, agent)
}