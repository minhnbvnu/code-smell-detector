function setContext(handler, context) {
      handler.context = context;
      if (handler.contextDidChange) { handler.contextDidChange(); }
    }