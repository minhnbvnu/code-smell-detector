function markLayoutEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('layout-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--layout-effects-stop');
    }
  }