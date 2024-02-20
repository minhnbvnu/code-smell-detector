function createStreamingAggregator(config, agent) {
  const { metrics } = agent
  logger.trace('Creating streaming span event aggregator for infinite tracing.')
  const GrpcConnection = require('../grpc/connection')

  const connection = new GrpcConnection(config.infinite_tracing, metrics)
  let spanStreamer

  if (config.infinite_tracing.batching) {
    const BatchSpanStreamer = require('./batch-span-streamer')
    spanStreamer = new BatchSpanStreamer(
      config.license_key,
      connection,
      metrics,
      config.infinite_tracing.span_events.queue_size
    )
    metrics.getOrCreateMetric(`${NAMES.BATCHING}/enabled`).incrementCallCount()
  } else {
    const SpanStreamer = require('./span-streamer')
    spanStreamer = new SpanStreamer(
      config.license_key,
      connection,
      metrics,
      config.infinite_tracing.span_events.queue_size
    )
    metrics.getOrCreateMetric(`${NAMES.BATCHING}/disabled`).incrementCallCount()
  }

  // this periodMs has no affect on gRPC calls
  // the send method on StreamingSpanEventAggregator is a no-op
  const opts = {
    periodMs: 1000,
    limit: 50000,
    span_streamer: spanStreamer,
    config,
    enabled: (config) => config.distributed_tracing.enabled && config.span_events.enabled
  }

  return new StreamingSpanEventAggregator(opts, agent)
}