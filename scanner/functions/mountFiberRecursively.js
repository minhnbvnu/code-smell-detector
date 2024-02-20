function mountFiberRecursively(firstChild, parentFiber, traverseSiblings, traceNearestHostComponentUpdate) {
    // Iterate over siblings rather than recursing.
    // This reduces the chance of stack overflow for wide trees (e.g. lists with many items).
    let fiber = firstChild;

    while (fiber !== null) {
      // Generate an ID even for filtered Fibers, in case it's needed later (e.g. for Profiling).
      getOrGenerateFiberID(fiber);

      if (constants["F" /* __DEBUG__ */]) {
        debug('mountFiberRecursively()', fiber, parentFiber);
      } // If we have the tree selection from previous reload, try to match this Fiber.
      // Also remember whether to do the same for siblings.


      const mightSiblingsBeOnTrackedPath = updateTrackedPathStateBeforeMount(fiber);
      const shouldIncludeInTree = !shouldFilterFiber(fiber);

      if (shouldIncludeInTree) {
        recordMount(fiber, parentFiber);
      }

      if (traceUpdatesEnabled) {
        if (traceNearestHostComponentUpdate) {
          const elementType = getElementTypeForFiber(fiber); // If an ancestor updated, we should mark the nearest host nodes for highlighting.

          if (elementType === types["i" /* ElementTypeHostComponent */]) {
            traceUpdatesForNodes.add(fiber.stateNode);
            traceNearestHostComponentUpdate = false;
          }
        } // We intentionally do not re-enable the traceNearestHostComponentUpdate flag in this branch,
        // because we don't want to highlight every host node inside of a newly mounted subtree.

      }

      const isSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent;

      if (isSuspense) {
        const isTimedOut = fiber.memoizedState !== null;

        if (isTimedOut) {
          // Special case: if Suspense mounts in a timed-out state,
          // get the fallback child from the inner fragment and mount
          // it as if it was our own child. Updates handle this too.
          const primaryChildFragment = fiber.child;
          const fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
          const fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

          if (fallbackChild !== null) {
            mountFiberRecursively(fallbackChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        } else {
          let primaryChild = null;
          const areSuspenseChildrenConditionallyWrapped = OffscreenComponent === -1;

          if (areSuspenseChildrenConditionallyWrapped) {
            primaryChild = fiber.child;
          } else if (fiber.child !== null) {
            primaryChild = fiber.child.child;
          }

          if (primaryChild !== null) {
            mountFiberRecursively(primaryChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        }
      } else {
        if (fiber.child !== null) {
          mountFiberRecursively(fiber.child, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
        }
      } // We're exiting this Fiber now, and entering its siblings.
      // If we have selection to restore, we might need to re-activate tracking.


      updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath);
      fiber = traverseSiblings ? fiber.sibling : null;
    }
  }