function setUpAlert() {
  if (!GLOBAL.alert) {
    GLOBAL.alert = function(text) {
      // Require Alert on demand. Requiring it too early can lead to issues
      // with things like Platform not being fully initialized.
      require('Alert').alert('Alert', '' + text);
    };
  }
}