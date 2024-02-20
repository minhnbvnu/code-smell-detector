function listenerToString(listener) {
        return typeof listener === "function" ? listener.toString() : listener.handleEvent.toString();
      }