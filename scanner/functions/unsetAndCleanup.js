function unsetAndCleanup(name, value, controller) {
    if (ctrl[name]) {
      unset(ctrl[name], value, controller);
    }
    if (isObjectEmpty(ctrl[name])) {
      ctrl[name] = undefined;
    }
  }