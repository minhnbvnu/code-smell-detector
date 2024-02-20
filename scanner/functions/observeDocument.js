function observeDocument(context) {
    if (context.isDomObserved) {
      return;
    } // enable dynamically added elements handling


    context.isDomObserved = true;
    context.domMutationObserver = new natives.MutationObserver(mutations => {
      if (!mutations || mutations.length === 0) {
        return;
      }

      const eventTracker = new EventTracker();

      if (eventTracker.isIgnoredEventType() && shouldIgnoreMutations(mutations)) {
        return;
      } // save instance of EventTracker to context
      // for removing its event listeners on disconnectDocument() while mainDisconnect()


      context.eventTracker = eventTracker;
      context.scheduler.run();
    });
    context.domMutationObserver.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'class']
    });
  }