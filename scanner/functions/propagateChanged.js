function propagateChanged(observable) {
  if (observable.lowestObserverState === __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].DIRTY) {
    return;
  }

  observable.lowestObserverState = __WEBPACK_IMPORTED_MODULE_1__derivation__["a" /* DerivationState */].DIRTY;
  observable.observers.forEach(function (d) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__derivation__["f" /* setDerivationDirty */])(d);
  });
}