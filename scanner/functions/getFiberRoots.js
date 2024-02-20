function getFiberRoots(rendererID) {
    const roots = fiberRoots;

    if (!roots[rendererID]) {
      roots[rendererID] = new Set();
    }

    return roots[rendererID];
  }