function assertCallCount(spy, expected) {
    return function() { return spy.callCount === expected; };
  }