function queueForUnobservation(observable) {
  if (!observable.isPendingUnobservation) {
    observable.isPendingUnobservation = true;
    __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].pendingUnobservations.push(observable);
  }
}