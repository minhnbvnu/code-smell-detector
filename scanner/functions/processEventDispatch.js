function processEventDispatch(event, timestamp, profilerData, state) {
  const data = event.args.data;
  const type = data.type;

  if (type.startsWith('react-')) {
    const stackTrace = data.stackTrace;

    if (stackTrace) {
      const topFrame = stackTrace[stackTrace.length - 1];

      if (topFrame.url.includes('/react-dom.')) {
        // Filter out fake React events dispatched by invokeGuardedCallbackDev.
        return;
      }
    }
  } // Reduce noise from events like DOMActivate, load/unload, etc. which are usually not relevant


  if (type === 'blur' || type === 'click' || type === 'input' || type.startsWith('focus') || type.startsWith('key') || type.startsWith('mouse') || type.startsWith('pointer')) {
    const duration = event.dur / 1000;
    let depth = 0;

    while (state.nativeEventStack.length > 0) {
      const prevNativeEvent = state.nativeEventStack[state.nativeEventStack.length - 1];
      const prevStopTime = prevNativeEvent.timestamp + prevNativeEvent.duration;

      if (timestamp < prevStopTime) {
        depth = prevNativeEvent.depth + 1;
        break;
      } else {
        state.nativeEventStack.pop();
      }
    }

    const nativeEvent = {
      depth,
      duration,
      timestamp,
      type,
      warning: null
    };
    profilerData.nativeEvents.push(nativeEvent); // Keep track of curent event in case future ones overlap.
    // We separate them into different vertical lanes in this case.

    state.nativeEventStack.push(nativeEvent);
  }
}