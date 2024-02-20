function getBreakpoints(breakpoints, width) {
  return Object.keys(breakpoints).filter((name) => {
    return width >= breakpoints[name];
  });
}