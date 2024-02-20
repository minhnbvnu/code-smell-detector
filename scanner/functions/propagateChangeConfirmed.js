function propagateChangeConfirmed(observable) {
  if (observable.lowestObserverState === __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].DIRTY) {
    return;
  }

  observable.lowestObserverState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].DIRTY;
  observable.observers.forEach(function (d) {
    if (d.dependenciesState === __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].MYBE_DIRTY) {
      d.dependenciesState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].DIRTY;
    } else if (d.dependenciesState === __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].UP_TO_DATE) {
      observable.lowestObserverState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].UP_TO_DATE;
    }
  });
}