function markCommitStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('commit');
      recordReactMeasureCompleted('render-idle');
    }

    if (supportsUserTimingV3) {
      markAndClear('--commit-stop');
    }
  }