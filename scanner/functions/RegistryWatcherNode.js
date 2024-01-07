constructor(nativeWatcher, absolutePathSegments, childPaths) {
    this.nativeWatcher = nativeWatcher;
    this.absolutePathSegments = absolutePathSegments;

    // Store child paths as joined strings so they work as Set members.
    this.childPaths = new Set();
    for (let i = 0; i < childPaths.length; i++) {
      this.childPaths.add(path.join(...childPaths[i]));
    }
  }