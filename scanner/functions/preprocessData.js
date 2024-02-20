async function preprocessData(timeline) {
  const flamechart = preprocessFlamechart(timeline);
  const laneToReactMeasureMap = new Map();

  for (let lane = 0; lane < src_constants["a" /* REACT_TOTAL_NUM_LANES */]; lane++) {
    laneToReactMeasureMap.set(lane, []);
  }

  const profilerData = {
    batchUIDToMeasuresMap: new Map(),
    componentMeasures: [],
    duration: 0,
    flamechart,
    internalModuleSourceToRanges: new Map(),
    laneToLabelMap: new Map(),
    laneToReactMeasureMap,
    nativeEvents: [],
    networkMeasures: [],
    otherUserTimingMarks: [],
    reactVersion: null,
    schedulingEvents: [],
    snapshots: [],
    snapshotHeight: 0,
    startTime: 0,
    suspenseEvents: [],
    thrownErrors: []
  }; // Sort `timeline`. JSON Array Format trace events need not be ordered. See:
  // https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#heading=h.f2f0yd51wi15

  timeline = timeline.filter(Boolean).sort((a, b) => a.ts > b.ts ? 1 : -1); // Events displayed in flamechart have timestamps relative to the profile
  // event's startTime. Source: https://github.com/v8/v8/blob/44bd8fd7/src/inspector/js_protocol.json#L1486
  //
  // We'll thus expect there to be a 'Profile' event; if there is not one, we
  // can deduce that there are no flame chart events. As we expect React
  // scheduling profiling user timing marks to be recorded together with browser
  // flame chart events, we can futher deduce that the data is invalid and we
  // don't bother finding React events.

  const indexOfProfileEvent = timeline.findIndex(event => event.name === 'Profile');

  if (indexOfProfileEvent === -1) {
    return profilerData;
  } // Use Profile event's `startTime` as the start time to align with flame chart.
  // TODO: Remove assumption that there'll only be 1 'Profile' event. If this
  // assumption does not hold, the chart may start at the wrong time.


  profilerData.startTime = timeline[indexOfProfileEvent].args.data.startTime;
  profilerData.duration = (timeline[timeline.length - 1].ts - profilerData.startTime) / 1000;
  const state = {
    asyncProcessingPromises: [],
    batchUID: 0,
    currentReactComponentMeasure: null,
    internalModuleCurrentStackFrame: null,
    internalModuleStackStringSet: new Set(),
    measureStack: [],
    nativeEventStack: [],
    nextRenderShouldGenerateNewBatchID: true,
    potentialLongEvents: [],
    potentialLongNestedUpdate: null,
    potentialLongNestedUpdates: [],
    potentialSuspenseEventsOutsideOfTransition: [],
    requestIdToNetworkMeasureMap: new Map(),
    uidCounter: 0,
    unresolvedSuspenseEvents: new Map()
  };
  timeline.forEach(event => processTimelineEvent(event, profilerData, state));

  if (profilerVersion === null) {
    if (profilerData.schedulingEvents.length === 0 && profilerData.batchUIDToMeasuresMap.size === 0) {
      // No profiler version could indicate data was logged using an older build of React,
      // before an explicitly profiler version was included in the logging data.
      // But it could also indicate that the website was either not using React, or using a production build.
      // The easiest way to check for this case is to see if the data contains any scheduled updates or render work.
      throw new InvalidProfileError('No React marks were found in the provided profile.' + ' Please provide profiling data from an React application running in development or profiling mode.');
    }

    throw new InvalidProfileError(`This version of profiling data is not supported by the current profiler.`);
  } // Validate that all events and measures are complete


  const {
    measureStack
  } = state;

  if (measureStack.length > 0) {
    console.error('Incomplete events or measures', measureStack);
  } // Check for warnings.


  state.potentialLongEvents.forEach(([nativeEvent, batchUID]) => {
    // See how long the subsequent batch of React work was.
    // Ignore any work that was already started.
    const [startTime, stopTime] = getBatchRange(batchUID, profilerData, nativeEvent.timestamp);

    if (stopTime - startTime > NATIVE_EVENT_DURATION_THRESHOLD) {
      nativeEvent.warning = WARNING_STRINGS.LONG_EVENT_HANDLER;
    }
  });
  state.potentialLongNestedUpdates.forEach(([schedulingEvent, batchUID]) => {
    // See how long the subsequent batch of React work was.
    const [startTime, stopTime] = getBatchRange(batchUID, profilerData);

    if (stopTime - startTime > NESTED_UPDATE_DURATION_THRESHOLD) {
      // Don't warn about transition updates scheduled during the commit phase.
      // e.g. useTransition, useDeferredValue
      // These are allowed to be long-running.
      if (!schedulingEvent.lanes.some(lane => profilerData.laneToLabelMap.get(lane) === 'Transition')) {// FIXME: This warning doesn't account for "nested updates" that are
        // spawned by useDeferredValue. Disabling temporarily until we figure
        // out the right way to handle this.
        // schedulingEvent.warning = WARNING_STRINGS.NESTED_UPDATE;
      }
    }
  });
  state.potentialSuspenseEventsOutsideOfTransition.forEach(([suspenseEvent, lanes]) => {
    // HACK This is a bit gross but the numeric lane value might change between render versions.
    if (!lanes.some(lane => profilerData.laneToLabelMap.get(lane) === 'Transition')) {
      suspenseEvent.warning = WARNING_STRINGS.SUSPEND_DURING_UPDATE;
    }
  }); // Wait for any async processing to complete before returning.
  // Since processing is done in a worker, async work must complete before data is serialized and returned.

  await Promise.all(state.asyncProcessingPromises); // Now that all images have been loaded, let's figure out the display size we're going to use for our thumbnails:
  // both the ones rendered to the canvas and the ones shown on hover.

  if (profilerData.snapshots.length > 0) {
    // NOTE We assume a static window size here, which is not necessarily true but should be for most cases.
    // Regardless, Chrome also sets a single size/ratio and stick with it- so we'll do the same.
    const snapshot = profilerData.snapshots[0];
    profilerData.snapshotHeight = Math.min(snapshot.height, src_constants["c" /* SNAPSHOT_MAX_HEIGHT */]);
  }

  return profilerData;
}