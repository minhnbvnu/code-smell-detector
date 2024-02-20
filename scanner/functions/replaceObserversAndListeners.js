function replaceObserversAndListeners(obj, key, observerOrListener) {
  var prev = obj[key];

  if ('function' === typeof prev) {
    updateObserversAndListeners(obj, key, prev, '__ember_observesBefore__', 'removeBeforeObserver');
    updateObserversAndListeners(obj, key, prev, '__ember_observes__', 'removeObserver');
    updateObserversAndListeners(obj, key, prev, '__ember_listens__', 'removeListener');
  }

  if ('function' === typeof observerOrListener) {
    updateObserversAndListeners(obj, key, observerOrListener, '__ember_observesBefore__', 'addBeforeObserver');
    updateObserversAndListeners(obj, key, observerOrListener, '__ember_observes__', 'addObserver');
    updateObserversAndListeners(obj, key, observerOrListener, '__ember_listens__', 'addListener');
  }
}