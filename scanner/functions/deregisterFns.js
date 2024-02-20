function deregisterFns() {
    // remove all existing $attrs.$observe's
    for (var x = 0; x < deregisters.length; x++) {
      deregisters[x]();
    }
    deregisters = [];
  }