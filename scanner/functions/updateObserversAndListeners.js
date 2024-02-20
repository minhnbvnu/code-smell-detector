function updateObserversAndListeners(obj, key, observerOrListener, pathsKey, updateMethod) {
  var paths = observerOrListener[pathsKey];

  if (paths) {
    for (var i=0, l=paths.length; i<l; i++) {
      Ember[updateMethod](obj, paths[i], null, key);
    }
  }
}