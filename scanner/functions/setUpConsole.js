function setUpConsole() {
  // ExceptionsManager transitively requires Promise so we install it after
  var ExceptionsManager = require('ExceptionsManager');
  ExceptionsManager.installConsoleErrorReporter();
}