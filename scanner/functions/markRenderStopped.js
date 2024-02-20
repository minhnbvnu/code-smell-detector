function markRenderStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-stop');
    }
  }