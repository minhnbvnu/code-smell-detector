function trailingEdge(time) {
    timerId = undefined;

    if (lastArgs) {
      return invoke(time);
    }

    lastArgs = undefined;
    lastThis = undefined;
    return result;
  }