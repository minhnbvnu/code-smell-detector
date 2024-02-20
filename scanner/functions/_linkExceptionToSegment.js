function _linkExceptionToSegment(exception) {
  const segment = this.agent.tracer.getSegment()
  if (!segment) {
    return
  }

  const spanContext = segment.getSpanContext()
  if (spanContext) {
    // Exception attributes will be added to span unless transaction
    // status code has been ignored. Last error wins.
    const config = this.agent.config
    const details = exception.getErrorDetails(config)
    spanContext.setError(details)
  }

  // Add the span/segment ID to the exception as agent attributes
  exception.agentAttributes.spanId = segment.id
}