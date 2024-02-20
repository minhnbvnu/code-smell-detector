function markRenderStarted(lanes) {
    if (isProfiling) {
      if (nextRenderShouldStartNewBatch) {
        nextRenderShouldStartNewBatch = false;
        currentBatchUID++;
      } // If this is a new batch of work, wrap an "idle" measure around it.
      // Log it before the "render" measure to preserve the stack ordering.


      if (currentReactMeasuresStack.length === 0 || currentReactMeasuresStack[currentReactMeasuresStack.length - 1].type !== 'render-idle') {
        recordReactMeasureStarted('render-idle', lanes);
      }

      recordReactMeasureStarted('render', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear(`--render-start-${lanes}`);
    }
  }