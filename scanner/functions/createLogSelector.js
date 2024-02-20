function createLogSelector(logLoader, ...args) {
  const selector = createSelector(...args);
  return () => selector(logLoader._version);
}