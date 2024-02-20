function newSpaceTracker() {
    let tracker = [];
    for (let i = 0; i < colCount; i++) {
      tracker.push(0);
    }
    return tracker;
  }