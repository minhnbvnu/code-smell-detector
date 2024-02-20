function insertCATRequestHeaders(headers, useAlternateHeaderNames) {
  const crossAppTracingEnabled = this.agent.config.cross_application_tracer.enabled
  const distributedTracingEnabled = this.agent.config.distributed_tracing.enabled

  if (!distributedTracingEnabled && !crossAppTracingEnabled) {
    this.logger.trace('Distributed Tracing and CAT are both disabled, not adding headers.')
    return
  }

  if (!headers) {
    this.logger.debug('Missing headers object, not adding headers!')
    return
  }

  const tx = this.tracer.getTransaction()
  if (!tx || !tx.isActive()) {
    this.logger.trace('No active transaction found, not adding headers.')
    return
  }

  if (distributedTracingEnabled) {
    // TODO: Should probably honor symbols.disableDT.
    // TODO: Official testing and support.
    tx.insertDistributedTraceHeaders(headers)
  } else {
    cat.addCatHeaders(this.agent.config, tx, headers, useAlternateHeaderNames)
  }
}