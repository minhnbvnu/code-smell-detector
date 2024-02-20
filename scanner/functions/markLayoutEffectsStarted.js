function markLayoutEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('layout-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear(`--layout-effects-start-${lanes}`);
    }
  }