function dirtyState(options) {
  var newState = deepClone(DirtyState);
  return mixin(newState, options);
}