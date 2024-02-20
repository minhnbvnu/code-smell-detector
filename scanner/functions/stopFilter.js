function stopFilter(handler) {
    return function stopHandler(e) {
      e.stopPropagation();
      return handler.call(this, e);
    };
  }