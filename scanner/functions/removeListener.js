function removeListener(element, listener) {
      var listeners = getListeners(element);
      for (var i = 0, len = listeners.length; i < len; ++i) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }