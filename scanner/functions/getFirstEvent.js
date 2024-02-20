function getFirstEvent(aggregator, t) {
  const events = getErrorEvents(aggregator)
  t.equal(events.length, 1)
  return events[0]
}