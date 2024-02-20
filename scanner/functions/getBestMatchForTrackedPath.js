function getBestMatchForTrackedPath() {
    if (trackedPath === null) {
      // Nothing to match.
      return null;
    }

    if (trackedPathMatchFiber === null) {
      // We didn't find anything.
      return null;
    } // Find the closest Fiber store is aware of.


    let fiber = trackedPathMatchFiber;

    while (fiber !== null && shouldFilterFiber(fiber)) {
      fiber = fiber.return;
    }

    if (fiber === null) {
      return null;
    }

    return {
      id: getFiberIDThrows(fiber),
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      isFullMatch: trackedPathMatchDepth === trackedPath.length - 1
    };
  }