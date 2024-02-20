function getCustomEvents(agent) {
  return agent.customEventAggregator.events.toArray()
}