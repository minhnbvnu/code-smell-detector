function getHiResTimestamp() {
    let timestamp;
    if (isBrowser4 && window_3.performance) {
      timestamp = window_3.performance.now();
    } else if (process_.hrtime) {
      const timeParts = process_.hrtime();
      timestamp = timeParts[0] * 1e3 + timeParts[1] / 1e6;
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }