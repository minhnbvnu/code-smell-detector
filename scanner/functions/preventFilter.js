function preventFilter(handler) {
    return function preventHandler(e) {
      e.preventDefault();
      return handler.call(this, e);
    };
  }