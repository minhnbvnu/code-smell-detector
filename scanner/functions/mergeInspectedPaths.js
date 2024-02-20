function mergeInspectedPaths(path) {
    let current = currentlyInspectedPaths;
    path.forEach(key => {
      if (!current[key]) {
        current[key] = {};
      }

      current = current[key];
    });
  }