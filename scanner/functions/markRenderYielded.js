function markRenderYielded() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-yield');
    }
  }