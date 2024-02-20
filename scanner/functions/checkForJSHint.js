function checkForJSHint(message) {
    if (message.match(/jshint/)) {
      enable();
    } else {
      disable();
    }
  }