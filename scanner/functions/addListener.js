function addListener(callOnAdd, element, listener) {
        eventListenerHandler.add(element, listener);

        if (callOnAdd) {
          listener(element);
        }
      }