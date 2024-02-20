function stopObservingEventName(element, eventName) {
    var registry = getRegistryForElement(element);
    var entries = registry[eventName];
    if (!entries) return;
    delete registry[eventName];

    var i = entries.length;
    while (i--)
      removeEvent(element, eventName, entries[i].responder);
  }