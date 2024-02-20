function createSpanEventAggregator(config, agent) {
  const traceObserver = config.infinite_tracing.trace_observer

  if (traceObserver.host) {
    traceObserver.host = traceObserver.host.trim()

    if (typeof traceObserver.port !== 'string') {
      traceObserver.port = String(traceObserver.port)
    }
    traceObserver.port = traceObserver.port.trim()

    try {
      return createStreamingAggregator(config, agent)
    } catch (err) {
      logger.warn(
        err,
        'Failed to create streaming span event aggregator for infinite tracing. ' +
          'Reverting to standard span event aggregator and disabling infinite tracing'
      )
      config.infinite_tracing.trace_observer = {
        host: '',
        port: ''
      }
      return createStandardAggregator(config, agent)
    }
  }

  return createStandardAggregator(config, agent)
}