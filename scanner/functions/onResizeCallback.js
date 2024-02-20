function onResizeCallback(element) {
        var listeners = eventListenerHandler.get(element);
        forEach$1(listeners, function callListenerProxy(listener) {
          listener(element);
        });
      }