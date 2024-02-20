function InvalidDurationError(reason) {
      return _LuxonError3.call(this, "Invalid Duration: " + reason.toMessage()) || this;
    }