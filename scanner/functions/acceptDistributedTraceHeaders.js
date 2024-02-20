function acceptDistributedTraceHeaders(transportType, headers) {
  if (headers == null || typeof headers !== 'object') {
    logger.trace(
      'Ignoring distributed trace headers for transaction %s. Headers not passed in as object.',
      this.id
    )
    return
  }

  const transport = TRANSPORT_TYPES_SET[transportType] ? transportType : TRANSPORT_TYPES.UNKNOWN

  // assumes header keys already lowercase
  const traceparent = headers[TRACE_CONTEXT_PARENT_HEADER]

  if (traceparent) {
    logger.trace('Accepting trace context DT payload for transaction %s', this.id)
    // assumes header keys already lowercase
    const tracestate = headers[TRACE_CONTEXT_STATE_HEADER]
    this.acceptTraceContextPayload(traceparent, tracestate, transport)
  } else if (NEWRELIC_TRACE_HEADER in headers) {
    logger.trace('Accepting newrelic DT payload for transaction %s', this.id)
    // assumes header keys already lowercase
    const payload = headers[NEWRELIC_TRACE_HEADER]
    this._acceptDistributedTracePayload(payload, transport)
  }
}