function setTimeout(fn, delay) {
      return delayedFunctionScheduler.scheduleFunction(fn, delay, argSlice(arguments, 2));
    }