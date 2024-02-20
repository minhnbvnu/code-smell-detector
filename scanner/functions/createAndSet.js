function createAndSet(name, value, controller) {
    if (!ctrl[name]) {
      ctrl[name] = {};
    }
    set(ctrl[name], value, controller);
  }