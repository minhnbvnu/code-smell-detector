function isHookThatCanScheduleUpdate(hookObject) {
    const queue = hookObject.queue;

    if (!queue) {
      return false;
    }

    const boundHasOwnProperty = shared_hasOwnProperty["a" /* default */].bind(queue); // Detect the shape of useState() or useReducer()
    // using the attributes that are unique to these hooks
    // but also stable (e.g. not tied to current Lanes implementation)

    const isStateOrReducer = boundHasOwnProperty('pending') && boundHasOwnProperty('dispatch') && typeof queue.dispatch === 'function'; // Detect useSyncExternalStore()

    const isSyncExternalStore = boundHasOwnProperty('value') && boundHasOwnProperty('getSnapshot') && typeof queue.getSnapshot === 'function'; // These are the only types of hooks that can schedule an update.

    return isStateOrReducer || isSyncExternalStore;
  }