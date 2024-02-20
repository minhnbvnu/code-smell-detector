function crawlToInitializeContextsMap(fiber) {
    const id = getFiberIDUnsafe(fiber); // Not all Fibers in the subtree have mounted yet.
    // For example, Offscreen (hidden) or Suspense (suspended) subtrees won't yet be tracked.
    // We can safely skip these subtrees.

    if (id !== null) {
      updateContextsForFiber(fiber);
      let current = fiber.child;

      while (current !== null) {
        crawlToInitializeContextsMap(current);
        current = current.sibling;
      }
    }
  }