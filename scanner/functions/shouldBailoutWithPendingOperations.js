function shouldBailoutWithPendingOperations() {
    if (isProfiling) {
      if (currentCommitProfilingMetadata != null && currentCommitProfilingMetadata.durations.length > 0) {
        return false;
      }
    }

    return pendingOperations.length === 0 && pendingRealUnmountedIDs.length === 0 && pendingSimulatedUnmountedIDs.length === 0 && pendingUnmountedRootID === null;
  }