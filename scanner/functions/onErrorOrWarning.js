function onErrorOrWarning(fiber, type, args) {
    if (type === 'error') {
      const maybeID = getFiberIDUnsafe(fiber); // if this is an error simulated by us to trigger error boundary, ignore

      if (maybeID != null && forceErrorForFiberIDs.get(maybeID) === true) {
        return;
      }
    }

    const message = Object(backend_utils["f" /* format */])(...args);

    if (constants["F" /* __DEBUG__ */]) {
      debug('onErrorOrWarning', fiber, null, `${type}: "${message}"`);
    } // Mark this Fiber as needed its warning/error count updated during the next flush.


    fibersWithChangedErrorOrWarningCounts.add(fiber); // Track the warning/error for later.

    const fiberMap = type === 'error' ? pendingFiberToErrorsMap : pendingFiberToWarningsMap;
    const messageMap = fiberMap.get(fiber);

    if (messageMap != null) {
      const count = messageMap.get(message) || 0;
      messageMap.set(message, count + 1);
    } else {
      fiberMap.set(fiber, new Map([[message, 1]]));
    } // Passive effects may trigger errors or warnings too;
    // In this case, we should wait until the rest of the passive effects have run,
    // but we shouldn't wait until the next commit because that might be a long time.
    // This would also cause "tearing" between an inspected Component and the tree view.
    // Then again we don't want to flush too soon because this could be an error during async rendering.
    // Use a debounce technique to ensure that we'll eventually flush.


    flushPendingErrorsAndWarningsAfterDelay();
  }