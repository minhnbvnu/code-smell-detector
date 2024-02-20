function findSpanByName(agent, name) {
  const spans = agent.spanEventAggregator.getEvents()

  for (const [, span] of spans.entries()) {
    if (span.intrinsics.name === name) {
      return span
    }
  }
}