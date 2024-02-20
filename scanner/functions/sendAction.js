function sendAction(eventName, view, event) {
  var action = get(view, eventName),
      on = get(view, 'onEvent'),
      value = get(view, 'value');

  // back-compat support for keyPress as an event name even though
  // it's also a method name that consumes the event (and therefore
  // incompatible with sendAction semantics).
  if (on === eventName || (on === 'keyPress' && eventName === 'key-press')) {
    view.sendAction('action', value);
  }

  view.sendAction(eventName, value);

  if (action || on === eventName) {
    if(!get(view, 'bubbles')) {
      event.stopPropagation();
    }
  }
}