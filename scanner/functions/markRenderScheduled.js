function markRenderScheduled(lane) {
    if (isProfiling) {
      if (currentTimelineData) {
        currentTimelineData.schedulingEvents.push({
          lanes: laneToLanesArray(lane),
          timestamp: getRelativeTime(),
          type: 'schedule-render',
          warning: null
        });
      }
    }

    if (supportsUserTimingV3) {
      markAndClear(`--schedule-render-${lane}`);
    }
  }