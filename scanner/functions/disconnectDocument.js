function disconnectDocument(context) {
    if (!context.isDomObserved) {
      return;
    } // disable dynamically added elements handling


    context.isDomObserved = false;

    if (context.domMutationObserver) {
      context.domMutationObserver.disconnect();
    } // clean up event listeners


    if (context.eventTracker) {
      context.eventTracker.stopTracking();
    }
  }