function recordUnmount(fiber, isSimulated) {
    if (constants["F" /* __DEBUG__ */]) {
      debug('recordUnmount()', fiber, null, isSimulated ? 'unmount is simulated' : '');
    }

    if (trackedPathMatchFiber !== null) {
      // We're in the process of trying to restore previous selection.
      // If this fiber matched but is being unmounted, there's no use trying.
      // Reset the state so we don't keep holding onto it.
      if (fiber === trackedPathMatchFiber || fiber === trackedPathMatchFiber.alternate) {
        setTrackedPath(null);
      }
    }

    const unsafeID = getFiberIDUnsafe(fiber);

    if (unsafeID === null) {
      // If we've never seen this Fiber, it might be inside of a legacy render Suspense fragment (so the store is not even aware of it).
      // In that case we can just ignore it or it will cause errors later on.
      // One example of this is a Lazy component that never resolves before being unmounted.
      //
      // This also might indicate a Fast Refresh force-remount scenario.
      //
      // TODO: This is fragile and can obscure actual bugs.
      return;
    } // Flow refinement.


    const id = unsafeID;
    const isRoot = fiber.tag === HostRoot;

    if (isRoot) {
      // Roots must be removed only after all children (pending and simulated) have been removed.
      // So we track it separately.
      pendingUnmountedRootID = id;
    } else if (!shouldFilterFiber(fiber)) {
      // To maintain child-first ordering,
      // we'll push it into one of these queues,
      // and later arrange them in the correct order.
      if (isSimulated) {
        pendingSimulatedUnmountedIDs.push(id);
      } else {
        pendingRealUnmountedIDs.push(id);
      }
    }

    if (!fiber._debugNeedsRemount) {
      untrackFiberID(fiber);
      const isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration');

      if (isProfilingSupported) {
        idToRootMap.delete(id);
        idToTreeBaseDurationMap.delete(id);
      }
    }
  }