function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    lastArgs = args;
    lastThis = this;
    lastCalled = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCalled);
      }

      timerId = startTimer(timerExpired, wait);
      return invoke(lastCalled);
    }

    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }

    return result;
  }