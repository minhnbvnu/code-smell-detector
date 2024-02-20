function handleCommitFiberUnmount(fiber) {
    // If the untrackFiberSet already has the unmounted Fiber, this means we've already
    // recordedUnmount, so we don't need to do it again. If we don't do this, we might
    // end up double-deleting Fibers in some cases (like Legacy Suspense).
    if (!untrackFibersSet.has(fiber)) {
      // This is not recursive.
      // We can't traverse fibers after unmounting so instead
      // we rely on React telling us about each unmount.
      recordUnmount(fiber, false);
    }
  }