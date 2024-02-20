function wrapUncaughtExceptionCallback(shim, original) {
    return function wrapped(fn) {
      exceptionCallbackRegistered = fn !== null
      return original.apply(this, arguments)
    }
  }