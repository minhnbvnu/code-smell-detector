function prepareStackTraceWithRawStackAssignment(error, frames) {
    if (error.rawStack) {
      // avoid infinite recursion
      return prepareStackTraceWithSourceMapping(error, frames);
    } else {
      error.rawStack = frames;
      return prepareStackTrace(error, frames);
    }
  }