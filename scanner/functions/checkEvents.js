function checkEvents(agent) {
  return function eventSampler() {
    const timer = new Timer()
    timer.begin()
    setTimeout(recordQueueTime.bind(null, agent, timer), 0)
  }
}