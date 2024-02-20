function throttle(func, wait) {
  var lastArgs;
  var lastThis;
  var result;
  var timerId;
  var lastCalled;
  var lastInvoked = 0;

  function invoke(time) {
    var args = lastArgs;
    var thisArg = lastThis;
    lastArgs = undefined;
    lastThis = undefined;
    lastInvoked = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      return requestAnimationFrame(pendingFunc);
    }

    return setTimeout(pendingFunc, wait);
  }

  function leadingEdge(time) {
    lastInvoked = time;
    timerId = startTimer(timerExpired, wait);
    return invoke(time);
  }

  function shouldInvoke(time) {
    var timeSinceLastCalled = time - lastCalled;
    var timeSinceLastInvoked = time - lastInvoked;
    return lastCalled === undefined || timeSinceLastCalled >= wait || timeSinceLastCalled < 0 || timeSinceLastInvoked >= wait;
  }

  function remainingWait(time) {
    var timeSinceLastCalled = time - lastCalled;
    var timeSinceLastInvoked = time - lastInvoked;
    return Math.min(wait - timeSinceLastCalled, wait - timeSinceLastInvoked);
  }

  function timerExpired() {
    var time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    if (lastArgs) {
      return invoke(time);
    }

    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }

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

  return debounced;
}