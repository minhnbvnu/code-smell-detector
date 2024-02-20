function bindDependencies(derivation) {
  var prevObserving = derivation.observing;
  var observing = derivation.observing = derivation.newObserving;
  var lowestNewObservingDerivationState = DerivationState.UP_TO_DATE; // Go through all new observables and check diffValue: (this list can contain duplicates):
  //   0: first occurrence, change to 1 and keep it
  //   1: extra occurrence, drop it

  var i0 = 0;
  var l = derivation.unboundDepsCount;

  for (var i = 0; i < l; i++) {
    var dep = observing[i];

    if (!dep.diffFlag) {
      dep.diffFlag = true;

      if (i0 !== i) {
        observing[i0] = dep;
      }

      i0++;
    } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
    // not hitting the condition


    if (dep.dependenciesState > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState;
    }
  }

  observing.length = i0;
  derivation.newObserving = null; // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
  //   0: it's not in new observables, unobserve it
  //   1: it keeps being observed, don't want to notify it. change to 0

  l = prevObserving.length;

  while (l--) {
    var _dep = prevObserving[l];

    if (!_dep.diffFlag) {
      Object(__WEBPACK_IMPORTED_MODULE_1__observable_observable__["h" /* removeObserver */])(_dep, derivation);
    }

    _dep.diffFlag = false;
  } // Go through all new observables and check diffValue: (now it should be unique)
  //   0: it was set to 0 in last loop. don't need to do anything.
  //   1: it wasn't observed, let's observe it. set back to 0


  while (i0--) {
    var _dep2 = observing[i0];

    if (_dep2.diffFlag) {
      _dep2.diffFlag = false;
      Object(__WEBPACK_IMPORTED_MODULE_1__observable_observable__["a" /* addObserver */])(_dep2, derivation);
    }
  } // Some new observed derivations may become stale during this derivation computation
  // so they have had no chance to propagate staleness (#916)


  if (lowestNewObservingDerivationState !== DerivationState.UP_TO_DATE) {
    derivation.dependenciesState = lowestNewObservingDerivationState;
    derivation.onBecomeDirty();
  }
}