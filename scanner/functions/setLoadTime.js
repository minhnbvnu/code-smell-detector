function setLoadTime(loadTime) {
    if (global.atom) {
      global.atom.loadTime = loadTime;
    }
  }