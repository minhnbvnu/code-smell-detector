function setInterval(fn, interval) {
      return delayedFunctionScheduler.scheduleFunction(fn, interval, argSlice(arguments, 2), true);
    }