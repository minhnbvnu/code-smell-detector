function propagateMaybeChanged(observable) {
  if (observable.lowestObserverState !== __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].UP_TO_DATE) {
    return;
  }

  observable.lowestObserverState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].MYBE_DIRTY;
  observable.observers.forEach(function (d) {
    if (d.dependenciesState === __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].UP_TO_DATE) {
      d.dependenciesState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].MYBE_DIRTY;
      d.onBecomeDirty();
    }
  });
}