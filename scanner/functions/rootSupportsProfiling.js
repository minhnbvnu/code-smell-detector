function rootSupportsProfiling(root) {
    if (root.memoizedInteractions != null) {
      // v16 builds include this field for the scheduler/tracing API.
      return true;
    } else if (root.current != null && root.current.hasOwnProperty('treeBaseDuration')) {
      // The scheduler/tracing API was removed in v17 though
      // so we need to check a non-root Fiber.
      return true;
    } else {
      return false;
    }
  }