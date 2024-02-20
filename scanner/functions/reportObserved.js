function reportObserved(observable) {
  var derivation = __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].trackingDerivation;

  if (!derivation) {
    return;
  }

  if (derivation.runId !== observable.lastAccessedBy) {
    observable.lastAccessedBy = derivation.runId;
    derivation.newObserving[derivation.unboundDepsCount++] = observable;

    if (!observable.isBeingObserved) {
      observable.isBeingObserved = true;
      observable.onBecomeObserved();
    }
  }
}