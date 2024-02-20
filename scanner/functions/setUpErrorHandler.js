function setUpErrorHandler() {
  if (global.__fbDisableExceptionsManager) {
    return;
  }

  function handleError(e, isFatal) {
    try {
      require('ExceptionsManager').handleException(e, isFatal);
    } catch (ee) {
      console.log('Failed to print error: ', ee.message);
    }
  }

  var ErrorUtils = require('ErrorUtils');
  ErrorUtils.setGlobalHandler(handleError);
}