function markPassiveEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('passive-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--passive-effects-stop');
    }
  }