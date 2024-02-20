function markComponentSuspended(fiber, wakeable, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      const eventType = wakeableIDs.has(wakeable) ? 'resuspend' : 'suspend';
      const id = getWakeableID(wakeable);
      const componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      const phase = fiber.alternate === null ? 'mount' : 'update'; // Following the non-standard fn.displayName convention,
      // frameworks like Relay may also annotate Promises with a displayName,
      // describing what operation/data the thrown Promise is related to.
      // When this is available we should pass it along to the Timeline.

      const displayName = wakeable.displayName || '';
      let suspenseEvent = null;

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        suspenseEvent = {
          componentName,
          depth: 0,
          duration: 0,
          id: `${id}`,
          phase,
          promiseName: displayName,
          resolution: 'unresolved',
          timestamp: getRelativeTime(),
          type: 'suspense',
          warning: null
        };

        if (currentTimelineData) {
          currentTimelineData.suspenseEvents.push(suspenseEvent);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear(`--suspense-${eventType}-${id}-${componentName}-${phase}-${lanes}-${displayName}`);
      }

      wakeable.then(() => {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'resolved';
        }

        if (supportsUserTimingV3) {
          markAndClear(`--suspense-resolved-${id}-${componentName}`);
        }
      }, () => {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'rejected';
        }

        if (supportsUserTimingV3) {
          markAndClear(`--suspense-rejected-${id}-${componentName}`);
        }
      });
    }
  }