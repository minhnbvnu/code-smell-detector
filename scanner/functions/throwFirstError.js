function throwFirstError() {
    if (pendingErrors.length) {
      throw pendingErrors.shift();
    }
  }