function callCallback(stub, args) {
    if (stub.callArgAts.length > 0) {
      var func = getCallback(stub, args);

      if (typeof func != "function") {
        throw new TypeError(getCallbackError(stub, func, args));
      }

      var callbackArguments = getChangingValue(stub, "callbackArguments");
      var callbackContext = getChangingValue(stub, "callbackContexts");

      if (stub.callbackAsync) {
        nextTick(function () {
          func.apply(callbackContext, callbackArguments);
        });
      } else {
        func.apply(callbackContext, callbackArguments);
      }
    }
  }