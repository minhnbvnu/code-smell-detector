function createDescendantContext(name, initialValue) {
  if (initialValue === void 0) {
    initialValue = {};
  }

  var descendants = [];
  return createNamedContext(name, reach_descendants_esm_extends({
    descendants: descendants,
    registerDescendant: noop,
    unregisterDescendant: noop
  }, initialValue));
}