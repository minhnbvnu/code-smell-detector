function shouldInvoke(time) {
    var timeSinceLastCalled = time - lastCalled;
    var timeSinceLastInvoked = time - lastInvoked;
    return lastCalled === undefined || timeSinceLastCalled >= wait || timeSinceLastCalled < 0 || timeSinceLastInvoked >= wait;
  }