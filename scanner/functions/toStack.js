function toStack(node) {
  var events;
  if (node.type === 'document') {
    events = ['Document', CHILDREN, 'DocumentExit'];
  } else if (node.type === 'root') {
    events = ['Root', CHILDREN, 'RootExit'];
  } else {
    events = getEvents(node);
  }
  return {
    node: node,
    events: events,
    eventIndex: 0,
    visitors: [],
    visitorIndex: 0,
    iterator: 0
  };
}