function clearErrorsAndWarnings() {
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    for (const id of fiberIDToErrorsMap.keys()) {
      const fiber = idToArbitraryFiberMap.get(id);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
        updateMostRecentlyInspectedElementIfNecessary(id);
      }
    } // eslint-disable-next-line no-for-of-loops/no-for-of-loops


    for (const id of fiberIDToWarningsMap.keys()) {
      const fiber = idToArbitraryFiberMap.get(id);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
        updateMostRecentlyInspectedElementIfNecessary(id);
      }
    }

    fiberIDToErrorsMap.clear();
    fiberIDToWarningsMap.clear();
    flushPendingEvents();
  }