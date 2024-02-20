function processQueue(state) {
    var fn, deferred, pending;

    pending = state.pending;
    state.processScheduled = false;
    state.pending = undefined;
    for (var i = 0, ii = pending.length; i < ii; ++i) {
      deferred = pending[i][0];
      fn = pending[i][state.status];
      try {
        if (isFunction(fn)) {
          deferred.resolve(fn(state.value));
        } else if (state.status === 1) {
          deferred.resolve(state.value);
        } else {
          deferred.reject(state.value);
        }
      } catch (e) {
        deferred.reject(e);
        exceptionHandler(e);
      }
    }
  }