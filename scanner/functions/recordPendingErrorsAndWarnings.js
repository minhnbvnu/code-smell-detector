function recordPendingErrorsAndWarnings() {
    clearPendingErrorsAndWarningsAfterDelay();
    fibersWithChangedErrorOrWarningCounts.forEach(fiber => {
      const fiberID = getFiberIDUnsafe(fiber);

      if (fiberID === null) {// Don't send updates for Fibers that didn't mount due to e.g. Suspense or an error boundary.
      } else {
        const errorCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
        const warningCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
        pushOperation(constants["C" /* TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS */]);
        pushOperation(fiberID);
        pushOperation(errorCount);
        pushOperation(warningCount);
      } // Always clean up so that we don't leak.


      pendingFiberToErrorsMap.delete(fiber);
      pendingFiberToWarningsMap.delete(fiber);
    });
    fibersWithChangedErrorOrWarningCounts.clear();
  }