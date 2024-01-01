function assertButtonEvent (eventCall, eventName, eventId, eventState) {
  assert.equal(eventCall.args[0], eventName);
  assert.equal(eventCall.args[1].id, eventId);
  assert.deepEqual(eventCall.args[1].state, eventState);
}