function insertDistributedTraceHeaders(headers) {
  if (!headers) {
    logger.trace('insertDistributedTraceHeaders called without headers.')
    return
  }

  checkForExistingNrTraceHeaders(headers)

  // Ensure we have priority before generating trace headers.
  this._calculatePriority()

  this.traceContext.addTraceContextHeaders(headers)
  this.isDistributedTrace = true

  logger.trace('Added outbound request w3c trace context headers in transaction %s', this.id)

  if (this.agent.config.distributed_tracing.exclude_newrelic_header) {
    logger.trace('Excluding newrelic header due to exclude_newrelic_header: true')
    return
  }

  try {
    const newrelicFormatData = this._createDistributedTracePayload().httpSafe()
    headers[NEWRELIC_TRACE_HEADER] = newrelicFormatData
    logger.trace('Added outbound request distributed tracing headers in transaction %s', this.id)
  } catch (error) {
    logger.trace(error, 'Failed to create distributed trace payload')
  }
}