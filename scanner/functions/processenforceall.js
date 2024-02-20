function processenforceall() {
    if (state.option.enforceall) {
      for (var enforceopt in options.bool.enforcing) {
        if (state.option[enforceopt] === undefined &&
            !options.noenforceall[enforceopt]) {
          state.option[enforceopt] = true;
        }
      }
      for (var relaxopt in options.bool.relaxing) {
        if (state.option[relaxopt] === undefined) {
          state.option[relaxopt] = false;
        }
      }
    }
  }