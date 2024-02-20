function markComponentLayoutEffectMountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      const componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'layout-effect-mount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear(`--component-layout-effect-mount-start-${componentName}`);
      }
    }
  }