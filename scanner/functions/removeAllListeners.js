function removeAllListeners(element) {
      var listeners = getListeners(element);
      if (!listeners) {
        return;
      }
      listeners.length = 0;
    }