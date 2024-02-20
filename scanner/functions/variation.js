function variation(current, previous, offset = 0) {
  return {
    value: current,
    delta: current - previous,
    prcnt: (100 * (current - previous)) / (previous - offset),
  };
}