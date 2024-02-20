function findReorderedChildrenRecursively(fiber, nextChildren) {
    if (!shouldFilterFiber(fiber)) {
      nextChildren.push(getFiberIDThrows(fiber));
    } else {
      let child = fiber.child;
      const isTimedOutSuspense = fiber.tag === SuspenseComponent && fiber.memoizedState !== null;

      if (isTimedOutSuspense) {
        // Special case: if Suspense mounts in a timed-out state,
        // get the fallback child from the inner fragment,
        // and skip over the primary child.
        const primaryChildFragment = fiber.child;
        const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
        const fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

        if (fallbackChild !== null) {
          child = fallbackChild;
        }
      }

      while (child !== null) {
        findReorderedChildrenRecursively(child, nextChildren);
        child = child.sibling;
      }
    }
  }