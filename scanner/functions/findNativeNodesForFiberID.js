function findNativeNodesForFiberID(id) {
    try {
      let fiber = findCurrentFiberUsingSlowPathById(id);

      if (fiber === null) {
        return null;
      } // Special case for a timed-out Suspense.


      const isTimedOutSuspense = fiber.tag === SuspenseComponent && fiber.memoizedState !== null;

      if (isTimedOutSuspense) {
        // A timed-out Suspense's findDOMNode is useless.
        // Try our best to find the fallback directly.
        const maybeFallbackFiber = fiber.child && fiber.child.sibling;

        if (maybeFallbackFiber != null) {
          fiber = maybeFallbackFiber;
        }
      }

      const hostFibers = findAllCurrentHostFibers(id);
      return hostFibers.map(hostFiber => hostFiber.stateNode).filter(Boolean);
    } catch (err) {
      // The fiber might have unmounted by now.
      return null;
    }
  }