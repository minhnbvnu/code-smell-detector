function setupErrorGuard() {
  var onError = function(e) {
    global.console.error('Error: ' + e.message + ', stack:\n' + e.stack);
  };
  global.ErrorUtils.setGlobalHandler(onError);
}