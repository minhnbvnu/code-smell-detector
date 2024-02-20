function markStateUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      const componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          const event = {
            componentName,
            // Store the parent fibers so we can post process
            // them after we finish profiling
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-state-update',
            warning: null
          };
          currentFiberStacks.set(event, getParentFibers(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

          currentTimelineData.schedulingEvents.push(event);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear(`--schedule-state-update-${lane}-${componentName}`);
      }
    }
  }