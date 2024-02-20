function markCommitStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('commit', lanes); // TODO (timeline) Re-think this approach to "batching"; I don't think it works for Suspense or pre-rendering.
      // This issue applies to the User Timing data also.

      nextRenderShouldStartNewBatch = true;
    }

    if (supportsUserTimingV3) {
      markAndClear(`--commit-start-${lanes}`); // Some metadata only needs to be logged once per session,
      // but if profiling information is being recorded via the Performance tab,
      // DevTools has no way of knowing when the recording starts.
      // Because of that, we log thie type of data periodically (once per commit).

      markMetadata();
    }
  }