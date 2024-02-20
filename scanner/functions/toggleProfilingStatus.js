function toggleProfilingStatus(value) {
    if (isProfiling !== value) {
      isProfiling = value;

      if (isProfiling) {
        const internalModuleSourceToRanges = new Map();

        if (supportsUserTimingV3) {
          const ranges = getInternalModuleRanges();

          if (ranges) {
            for (let i = 0; i < ranges.length; i++) {
              const range = ranges[i];

              if (Object(shared_isArray["a" /* default */])(range) && range.length === 2) {
                const [startStackFrame, stopStackFrame] = ranges[i];
                markAndClear(`--react-internal-module-start-${startStackFrame}`);
                markAndClear(`--react-internal-module-stop-${stopStackFrame}`);
              }
            }
          }
        }

        const laneToReactMeasureMap = new Map();
        let lane = 1;

        for (let index = 0; index < src_constants["a" /* REACT_TOTAL_NUM_LANES */]; index++) {
          laneToReactMeasureMap.set(lane, []);
          lane *= 2;
        }

        currentBatchUID = 0;
        currentReactComponentMeasure = null;
        currentReactMeasuresStack = [];
        currentFiberStacks = new Map();
        currentTimelineData = {
          // Session wide metadata; only collected once.
          internalModuleSourceToRanges,
          laneToLabelMap: laneToLabelMap || new Map(),
          reactVersion,
          // Data logged by React during profiling session.
          componentMeasures: [],
          schedulingEvents: [],
          suspenseEvents: [],
          thrownErrors: [],
          // Data inferred based on what React logs.
          batchUIDToMeasuresMap: new Map(),
          duration: 0,
          laneToReactMeasureMap,
          startTime: 0,
          // Data only available in Chrome profiles.
          flamechart: [],
          nativeEvents: [],
          networkMeasures: [],
          otherUserTimingMarks: [],
          snapshots: [],
          snapshotHeight: 0
        };
        nextRenderShouldStartNewBatch = true;
      } else {
        // Postprocess Profile data
        if (currentTimelineData !== null) {
          currentTimelineData.schedulingEvents.forEach(event => {
            if (event.type === 'schedule-state-update') {
              // TODO(luna): We can optimize this by creating a map of
              // fiber to component stack instead of generating the stack
              // for every fiber every time
              const fiberStack = currentFiberStacks.get(event);

              if (fiberStack && currentDispatcherRef != null) {
                event.componentStack = fiberStack.reduce((trace, fiber) => {
                  return trace + Object(DevToolsFiberComponentStack["a" /* describeFiber */])(workTagMap, fiber, currentDispatcherRef);
                }, '');
              }
            }
          });
        } // Clear the current fiber stacks so we don't hold onto the fibers
        // in memory after profiling finishes


        currentFiberStacks.clear();
      }
    }
  }