function markForceUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      const componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.schedulingEvents.push({
            componentName,
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-force-update',
            warning: null
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear(`--schedule-forced-update-${lane}-${componentName}`);
      }
    }
  }