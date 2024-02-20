function unmountFiberChildrenRecursively(fiber) {
    if (constants["F" /* __DEBUG__ */]) {
      debug('unmountFiberChildrenRecursively()', fiber);
    } // We might meet a nested Suspense on our way.


    const isTimedOutSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent && fiber.memoizedState !== null;
    let child = fiber.child;

    if (isTimedOutSuspense) {
      // If it's showing fallback tree, let's traverse it instead.
      const primaryChildFragment = fiber.child;
      const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null; // Skip over to the real Fiber child.

      child = fallbackChildFragment ? fallbackChildFragment.child : null;
    }

    while (child !== null) {
      // Record simulated unmounts children-first.
      // We skip nodes without return because those are real unmounts.
      if (child.return !== null) {
        unmountFiberChildrenRecursively(child);
        recordUnmount(child, true);
      }

      child = child.sibling;
    }
  }