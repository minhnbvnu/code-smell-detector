function timerExpired() {
    var time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = startTimer(timerExpired, remainingWait(time));
  }