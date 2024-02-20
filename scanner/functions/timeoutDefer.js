function timeoutDefer(fn) {
    var time = +new Date(),
        timeToCall = Math.max(0, 16 - (time - lastTime));

    lastTime = time + timeToCall;
    return window.setTimeout(fn, timeToCall);
  }