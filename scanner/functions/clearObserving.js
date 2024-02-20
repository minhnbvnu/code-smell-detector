function clearObserving(derivation) {
  var obs = derivation.observing;
  derivation.observing = [];
  var i = obs.length;

  while (i--) {
    Object(__WEBPACK_IMPORTED_MODULE_1__observable_observable__["h" /* removeObserver */])(obs[i], derivation);
  }

  derivation.dependenciesState = DerivationState.NOT_TRACKING;
}