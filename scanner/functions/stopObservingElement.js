function stopObservingElement(element) {
    var uid = getUniqueElementID(element),
     registry = getRegistryForElement(element, uid);

    destroyRegistryForElement(element, uid);

    var entries, i;
    for (var eventName in registry) {
      if (eventName === 'element') continue;

      entries = registry[eventName];
      i = entries.length;
      while (i--)
        removeEvent(element, eventName, entries[i].responder);
    }
  }