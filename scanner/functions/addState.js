function addState(parentState, pattern, checkFn, iterateFn, processFn) {
    let state = parentState;

    for (let i = 0, ii = pattern.length - 1; i < ii; i++) {
      const item = pattern[i];
      state = state[item] || (state[item] = []);
    }

    state[pattern[pattern.length - 1]] = {
      checkFn,
      iterateFn,
      processFn
    };
  }