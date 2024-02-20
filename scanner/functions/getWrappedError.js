function getWrappedError() {
      var error = getFakeError();
      error.framesToPop = 1;
      return error;
    }