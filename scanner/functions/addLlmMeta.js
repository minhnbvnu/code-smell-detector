function addLlmMeta({ agent, segment }) {
  agent.metrics.getOrCreateMetric(TRACKING_METRIC).incrementCallCount()
  segment.transaction.trace.attributes.addAttribute(DESTINATIONS.TRANS_EVENT, 'llm', true)
}