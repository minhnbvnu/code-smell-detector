function recordQueueTime(agent, timer) {
  timer.end()
  agent.metrics.measureMilliseconds(NAMES.EVENTS.WAIT, null, timer.getDurationInMillis())
}