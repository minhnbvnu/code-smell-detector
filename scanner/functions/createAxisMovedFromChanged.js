function createAxisMovedFromChanged () {
    var changed = [];
    var i;

    for (i = 0; i < MOCKS.AXIS_VALUES_VALID.length; i++) {
      changed.push(false);
    }
    for (i = 0; i < arguments.length; i++) {
      changed[arguments[i]] = true;
    }
    return {
      // Axis values
      axis: MOCKS.AXIS_VALUES_VALID,
      // Which values changed since the last 'tick'
      changed: changed
    };
  }