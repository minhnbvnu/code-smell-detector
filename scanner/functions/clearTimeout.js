function clearTimeout(id) {
      return delayedFunctionScheduler.removeFunctionWithId(id);
    }