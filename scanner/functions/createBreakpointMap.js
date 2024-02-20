function createBreakpointMap(breakpoints) {
  const pairs = breakpoints.split(/\s+/);
  return Object.fromEntries(pairs.map((pair) => pair.split(':')));
}