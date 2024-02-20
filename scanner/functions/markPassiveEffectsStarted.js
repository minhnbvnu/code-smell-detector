function markPassiveEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('passive-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear(`--passive-effects-start-${lanes}`);
    }
  }