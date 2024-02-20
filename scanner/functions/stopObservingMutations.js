function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}