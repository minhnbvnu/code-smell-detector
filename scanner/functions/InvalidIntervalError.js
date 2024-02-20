function InvalidIntervalError(reason) {
      return _LuxonError2.call(this, "Invalid Interval: " + reason.toMessage()) || this;
    }