function leadingEdge(time) {
    lastInvoked = time;
    timerId = startTimer(timerExpired, wait);
    return invoke(time);
  }