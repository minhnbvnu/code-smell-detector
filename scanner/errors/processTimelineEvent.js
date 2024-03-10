function processTimelineEvent(event,
/** Finalized profiler data up to `event`. May be mutated. */
currentProfilerData,
/** Intermediate processor state. May be mutated. */
state) {
  const {
    cat,
    name,
    ts,
    ph
  } = event;
  const startTime = (ts - currentProfilerData.startTime) / 1000;

  switch (cat) {
    case 'disabled-by-default-devtools.screenshot':
      processScreenshot(event, startTime, currentProfilerData, state);
      break;

    case 'devtools.timeline':
      switch (name) {
        case 'EventDispatch':
          processEventDispatch(event, startTime, currentProfilerData, state);
          break;

        case 'ResourceFinish':
          processResourceFinish(event, startTime, currentProfilerData, state);
          break;

        case 'ResourceReceivedData':
          processResourceReceivedData(event, startTime, currentProfilerData, state);
          break;

        case 'ResourceReceiveResponse':
          processResourceReceiveResponse(event, startTime, currentProfilerData, state);
          break;

        case 'ResourceSendRequest':
          processResourceSendRequest(event, startTime, currentProfilerData, state);
          break;
      }

      break;

    case 'blink.user_timing':
      if (name.startsWith('--react-version-')) {
        const [reactVersion] = name.substr(16).split('-');
        currentProfilerData.reactVersion = reactVersion;
      } else if (name.startsWith('--profiler-version-')) {
        const [versionString] = name.substr(19).split('-');
        profilerVersion = parseInt(versionString, 10);

        if (profilerVersion !== src_constants["b" /* SCHEDULING_PROFILER_VERSION */]) {
          throw new InvalidProfileError(`This version of profiling data (${versionString}) is not supported by the current profiler.`);
        }
      } else if (name.startsWith('--react-lane-labels-')) {
        const [laneLabelTuplesString] = name.substr(20).split('-');
        updateLaneToLabelMap(currentProfilerData, laneLabelTuplesString);
      } else if (name.startsWith('--component-')) {
        processReactComponentMeasure(name, startTime, currentProfilerData, state);
      } else if (name.startsWith('--schedule-render-')) {
        const [laneBitmaskString] = name.substr(18).split('-');
        currentProfilerData.schedulingEvents.push({
          type: 'schedule-render',
          lanes: getLanesFromTransportDecimalBitmask(laneBitmaskString),
          timestamp: startTime,
          warning: null
        });
      } else if (name.startsWith('--schedule-forced-update-')) {
        const [laneBitmaskString, componentName] = name.substr(25).split('-');
        const forceUpdateEvent = {
          type: 'schedule-force-update',
          lanes: getLanesFromTransportDecimalBitmask(laneBitmaskString),
          componentName,
          timestamp: startTime,
          warning: null
        }; // If this is a nested update, make a note of it.
        // Once we're done processing events, we'll check to see if it was a long update and warn about it.

        if (state.measureStack.find(({
          type
        }) => type === 'commit')) {
          state.potentialLongNestedUpdate = forceUpdateEvent;
        }

        currentProfilerData.schedulingEvents.push(forceUpdateEvent);
      } else if (name.startsWith('--schedule-state-update-')) {
        const [laneBitmaskString, componentName] = name.substr(24).split('-');
        const stateUpdateEvent = {
          type: 'schedule-state-update',
          lanes: getLanesFromTransportDecimalBitmask(laneBitmaskString),
          componentName,
          timestamp: startTime,
          warning: null
        }; // If this is a nested update, make a note of it.
        // Once we're done processing events, we'll check to see if it was a long update and warn about it.

        if (state.measureStack.find(({
          type
        }) => type === 'commit')) {
          state.potentialLongNestedUpdate = stateUpdateEvent;
        }

        currentProfilerData.schedulingEvents.push(stateUpdateEvent);
      } else if (name.startsWith('--error-')) {
        const [componentName, phase, message] = name.substr(8).split('-');
        currentProfilerData.thrownErrors.push({
          componentName,
          message,
          phase: phase,
          timestamp: startTime,
          type: 'thrown-error'
        });
      } else if (name.startsWith('--suspense-suspend-')) {
        const [id, componentName, phase, laneBitmaskString, promiseName] = name.substr(19).split('-');
        const lanes = getLanesFromTransportDecimalBitmask(laneBitmaskString);
        const availableDepths = new Array(state.unresolvedSuspenseEvents.size + 1).fill(true);
        state.unresolvedSuspenseEvents.forEach(({
          depth
        }) => {
          availableDepths[depth] = false;
        });
        let depth = 0;

        for (let i = 0; i < availableDepths.length; i++) {
          if (availableDepths[i]) {
            depth = i;
            break;
          }
        } // TODO (timeline) Maybe we should calculate depth in post,
        // so unresolved Suspense requests don't take up space.
        // We can't know if they'll be resolved or not at this point.
        // We'll just give them a default (fake) duration width.


        const suspenseEvent = {
          componentName,
          depth,
          duration: null,
          id,
          phase: phase,
          promiseName: promiseName || null,
          resolution: 'unresolved',
          timestamp: startTime,
          type: 'suspense',
          warning: null
        };

        if (phase === 'update') {
          // If a component suspended during an update, we should verify that it was during a transition.
          // We need the lane metadata to verify this though.
          // Since that data is only logged during commit, we may not have it yet.
          // Store these events for post-processing then.
          state.potentialSuspenseEventsOutsideOfTransition.push([suspenseEvent, lanes]);
        }

        currentProfilerData.suspenseEvents.push(suspenseEvent);
        state.unresolvedSuspenseEvents.set(id, suspenseEvent);
      } else if (name.startsWith('--suspense-resolved-')) {
        const [id] = name.substr(20).split('-');
        const suspenseEvent = state.unresolvedSuspenseEvents.get(id);

        if (suspenseEvent != null) {
          state.unresolvedSuspenseEvents.delete(id);
          suspenseEvent.duration = startTime - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'resolved';
        }
      } else if (name.startsWith('--suspense-rejected-')) {
        const [id] = name.substr(20).split('-');
        const suspenseEvent = state.unresolvedSuspenseEvents.get(id);

        if (suspenseEvent != null) {
          state.unresolvedSuspenseEvents.delete(id);
          suspenseEvent.duration = startTime - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'rejected';
        }
      } else if (name.startsWith('--render-start-')) {
        if (state.nextRenderShouldGenerateNewBatchID) {
          state.nextRenderShouldGenerateNewBatchID = false;
          state.batchUID = state.uidCounter++;
        } // If this render is the result of a nested update, make a note of it.
        // Once we're done processing events, we'll check to see if it was a long update and warn about it.


        if (state.potentialLongNestedUpdate !== null) {
          state.potentialLongNestedUpdates.push([state.potentialLongNestedUpdate, state.batchUID]);
          state.potentialLongNestedUpdate = null;
        }

        const [laneBitmaskString] = name.substr(15).split('-');
        throwIfIncomplete('render', state.measureStack);

        if (getLastType(state.measureStack) !== 'render-idle') {
          markWorkStarted('render-idle', startTime, getLanesFromTransportDecimalBitmask(laneBitmaskString), currentProfilerData, state);
        }

        markWorkStarted('render', startTime, getLanesFromTransportDecimalBitmask(laneBitmaskString), currentProfilerData, state);

        for (let i = 0; i < state.nativeEventStack.length; i++) {
          const nativeEvent = state.nativeEventStack[i];
          const stopTime = nativeEvent.timestamp + nativeEvent.duration; // If React work was scheduled during an event handler, and the event had a long duration,
          // it might be because the React render was long and stretched the event.
          // It might also be that the React work was short and that something else stretched the event.
          // Make a note of this event for now and we'll examine the batch of React render work later.
          // (We can't know until we're done processing the React update anyway.)

          if (stopTime > startTime) {
            state.potentialLongEvents.push([nativeEvent, state.batchUID]);
          }
        }
      } else if (name.startsWith('--render-stop') || name.startsWith('--render-yield')) {
        markWorkCompleted('render', startTime, currentProfilerData, state.measureStack);
      } else if (name.startsWith('--commit-start-')) {
        state.nextRenderShouldGenerateNewBatchID = true;
        const [laneBitmaskString] = name.substr(15).split('-');
        markWorkStarted('commit', startTime, getLanesFromTransportDecimalBitmask(laneBitmaskString), currentProfilerData, state);
      } else if (name.startsWith('--commit-stop')) {
        markWorkCompleted('commit', startTime, currentProfilerData, state.measureStack);
        markWorkCompleted('render-idle', startTime, currentProfilerData, state.measureStack);
      } else if (name.startsWith('--layout-effects-start-')) {
        const [laneBitmaskString] = name.substr(23).split('-');
        markWorkStarted('layout-effects', startTime, getLanesFromTransportDecimalBitmask(laneBitmaskString), currentProfilerData, state);
      } else if (name.startsWith('--layout-effects-stop')) {
        markWorkCompleted('layout-effects', startTime, currentProfilerData, state.measureStack);
      } else if (name.startsWith('--passive-effects-start-')) {
        const [laneBitmaskString] = name.substr(24).split('-');
        markWorkStarted('passive-effects', startTime, getLanesFromTransportDecimalBitmask(laneBitmaskString), currentProfilerData, state);
      } else if (name.startsWith('--passive-effects-stop')) {
        markWorkCompleted('passive-effects', startTime, currentProfilerData, state.measureStack);
      } else if (name.startsWith('--react-internal-module-start-')) {
        const stackFrameStart = name.substr(30);

        if (!state.internalModuleStackStringSet.has(stackFrameStart)) {
          state.internalModuleStackStringSet.add(stackFrameStart);
          const parsedStackFrameStart = parseStackFrame(stackFrameStart);
          state.internalModuleCurrentStackFrame = parsedStackFrameStart;
        }
      } else if (name.startsWith('--react-internal-module-stop-')) {
        const stackFrameStop = name.substr(29);

        if (!state.internalModuleStackStringSet.has(stackFrameStop)) {
          state.internalModuleStackStringSet.add(stackFrameStop);
          const parsedStackFrameStop = parseStackFrame(stackFrameStop);

          if (parsedStackFrameStop !== null && state.internalModuleCurrentStackFrame !== null) {
            const parsedStackFrameStart = state.internalModuleCurrentStackFrame;
            state.internalModuleCurrentStackFrame = null;
            const range = [parsedStackFrameStart, parsedStackFrameStop];
            const ranges = currentProfilerData.internalModuleSourceToRanges.get(parsedStackFrameStart.fileName);

            if (ranges == null) {
              currentProfilerData.internalModuleSourceToRanges.set(parsedStackFrameStart.fileName, [range]);
            } else {
              ranges.push(range);
            }
          }
        }
      } else if (ph === 'R' || ph === 'n') {
        // User Timing mark
        currentProfilerData.otherUserTimingMarks.push({
          name,
          timestamp: startTime
        });
      } else if (ph === 'b') {// TODO: Begin user timing measure
      } else if (ph === 'e') {// TODO: End user timing measure
      } else if (ph === 'i' || ph === 'I') {// Instant events.
        // Note that the capital "I" is a deprecated value that exists in Chrome Canary traces.
      } else {
        throw new InvalidProfileError(`Unrecognized event ${JSON.stringify(event)}! This is likely a bug in this profiler tool.`);
      }

      break;
  }
}