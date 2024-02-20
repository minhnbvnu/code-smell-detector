function getCustomSpanAttributes(agent) {
  const spanContext = agent.tracer.getSpanContext()
  return spanContext && spanContext.customAttributes.get(DESTINATIONS.SPAN_EVENT)
}