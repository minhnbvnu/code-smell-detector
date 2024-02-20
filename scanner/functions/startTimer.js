function startTimer(pendingFunc, wait) {
    if (useRAF) {
      return requestAnimationFrame(pendingFunc);
    }

    return setTimeout(pendingFunc, wait);
  }