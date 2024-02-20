function endBatch() {
  if (--__WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].inBatch === 0) {
    // the batch is actually about to finish, all unobserving should happen here.
    var list = __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].pendingUnobservations;

    for (var i = 0; i < list.length; i++) {
      var observable = list[i];
      observable.isPendingUnobservation = false;

      if (observable.observers.size === 0) {
        if (observable.isBeingObserved) {
          // if this observable had reactive observers, trigger the hooks
          observable.isBeingObserved = false;
          observable.onBecomeUnobserved();
        }
      }
    }

    __WEBPACK_IMPORTED_MODULE_2__global_state__["a" /* globalState */].pendingUnobservations = [];
  }
}