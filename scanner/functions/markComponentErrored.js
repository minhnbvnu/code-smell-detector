function markComponentErrored(fiber, thrownValue, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      const componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      const phase = fiber.alternate === null ? 'mount' : 'update';
      let message = '';

      if (thrownValue !== null && typeof thrownValue === 'object' && typeof thrownValue.message === 'string') {
        message = thrownValue.message;
      } else if (typeof thrownValue === 'string') {
        message = thrownValue;
      }

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.thrownErrors.push({
            componentName,
            message,
            phase,
            timestamp: getRelativeTime(),
            type: 'thrown-error'
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear(`--error-${componentName}-${phase}-${message}`);
      }
    }
  }