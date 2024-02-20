function createMouseEnterLeaveResponder(uid, eventName, handler) {
    return function(event) {
      var cacheEntry = Event.cache[uid], element = cacheEntry.element;

      Event.extend(event, element);
      var parent = event.relatedTarget;

      while (parent && parent !== element) {
        try { parent = parent.parentNode; }
        catch(e) { parent = element; }
      }

      if (parent === element) return;
      handler.call(element, event);
    }
  }