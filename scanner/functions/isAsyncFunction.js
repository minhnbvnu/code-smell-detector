function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }