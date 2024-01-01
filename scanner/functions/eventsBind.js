function eventsBind (component, events) {
  var eventName;
  for (eventName in events) {
    component.events[eventName] = events[eventName].bind(component);
  }
}