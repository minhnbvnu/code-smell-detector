function endEvent(eventId) {
  const eventEndTime = Date.now();
  if (!_eventStarts[eventId]) {
    throw new Error('event(' + eventId + ') either ended or never started');
  }

  _writeAction({
    action: 'endEvent',
    eventId: eventId,
    tstamp: eventEndTime
  });
}