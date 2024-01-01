function assertEventStream (eventCalls, expectedEvents, excludedEvents) {
  for (var eventCall of eventCalls) {
    const expectedIndex = expectedEvents.indexOf(eventCall.args[0]);
    const discludedIndex = excludedEvents.indexOf(eventCall.args[0]);

    // Ensure we don't have a discluded event.
    assert.equal(discludedIndex, -1);

    // If we found an expected event, then move it to the discluded list
    // since we should only see expected events once.
    if (expectedIndex >= 0) {
      excludedEvents.push(expectedEvents.splice(expectedIndex, 1)[0]);
    }
  }

  assert.equal(expectedEvents.length, 0);
}