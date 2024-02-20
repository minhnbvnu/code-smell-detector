function remainingWait(time) {
    var timeSinceLastCalled = time - lastCalled;
    var timeSinceLastInvoked = time - lastInvoked;
    return Math.min(wait - timeSinceLastCalled, wait - timeSinceLastInvoked);
  }