function detatchDelegatedLogic({
  delegatedEventName,
  pathStr,
  allEvents
}) {
  const retain = [];
  const events = allEvents[delegatedEventName];

  forEach(events, (event) => {
    // pathStr is assigned to info in delegateListener
    if (event.info.pathStr !== pathStr) {
      retain.push(event);
    }
  });

  if (retain.length) {
    allEvents[delegatedEventName] = retain;
  } else {
    delete allEvents[delegatedEventName];
  }
}