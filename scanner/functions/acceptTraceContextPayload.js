function acceptTraceContextPayload(traceparent, tracestate, transport) {
  if (this.isDistributedTrace) {
    logger.warn(
      'Already accepted or created a distributed trace payload for transaction %s, ignoring call',
      this.id
    )

    if (this.acceptedDistributedTrace) {
      this.agent.recordSupportability('TraceContext/Accept/Ignored/Multiple')
    } else {
      this.agent.recordSupportability('TraceContext/Accept/Ignored/CreateBeforeAccept')
    }

    return
  }

  const traceContext = this.traceContext.acceptTraceContextPayload(traceparent, tracestate)

  if (traceContext.acceptedTraceparent) {
    this.acceptedDistributedTrace = true
    this.isDistributedTrace = true

    this.traceId = traceContext.traceId
    this.parentSpanId = traceContext.parentSpanId
    this.parentTransportDuration = traceContext.transportDuration
    this.parentTransportType = transport

    if (traceContext.acceptedTracestate) {
      this.parentType = traceContext.parentType
      this.parentAcct = traceContext.accountId
      this.parentApp = traceContext.appId
      this.parentId = traceContext.transactionId
      this.sampled = traceContext.sampled
      this.priority = traceContext.priority
    }
  }
}