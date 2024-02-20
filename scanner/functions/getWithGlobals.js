function getWithGlobals(obj, path) {
  return get(isGlobalPath(path) ? Ember.lookup : obj, path);
}