function scheduleProcessQueue(state) {
    if (state.processScheduled || !state.pending) return;
    state.processScheduled = true;
    nextTick(function() { processQueue(state); });
  }