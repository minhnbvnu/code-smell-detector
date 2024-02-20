function startEvent(eventName, data) {
  const eventStartTime = Date.now();

  if (eventName == null) {
    throw new Error('No event name specified');
  }

  if (data == null) {
    data = null;
  }

  const eventId = _uuid++;
  const action = {
    action: 'startEvent',
    data: data,
    eventId: eventId,
    eventName: eventName,
    tstamp: eventStartTime,
  };
  _eventStarts[eventId] = action;
  _writeAction(action);

  return eventId;
}