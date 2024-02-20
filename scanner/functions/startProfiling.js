function startProfiling(shouldRecordChangeDescriptions) {
    if (isProfiling) {
      return;
    }

    recordChangeDescriptions = shouldRecordChangeDescriptions; // Capture initial values as of the time profiling starts.
    // It's important we snapshot both the durations and the id-to-root map,
    // since either of these may change during the profiling session
    // (e.g. when a fiber is re-rendered or when a fiber gets removed).

    displayNamesByRootID = new Map();
    initialTreeBaseDurationsMap = new Map(idToTreeBaseDurationMap);
    initialIDToRootMap = new Map(idToRootMap);
    idToContextsMap = new Map();
    hook.getFiberRoots(rendererID).forEach(root => {
      const rootID = getFiberIDThrows(root.current);
      displayNamesByRootID.set(rootID, getDisplayNameForRoot(root.current));

      if (shouldRecordChangeDescriptions) {
        // Record all contexts at the time profiling is started.
        // Fibers only store the current context value,
        // so we need to track them separately in order to determine changed keys.
        crawlToInitializeContextsMap(root.current);
      }
    });
    isProfiling = true;
    profilingStartTime = renderer_getCurrentTime();
    rootToCommitProfilingMetadataMap = new Map();

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(true);
    }
  }