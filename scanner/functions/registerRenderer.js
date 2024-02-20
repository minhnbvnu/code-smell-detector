function registerRenderer(renderer, onErrorOrWarning) {
  const {
    currentDispatcherRef,
    getCurrentFiber,
    findFiberByHostInstance,
    version
  } = renderer; // Ignore React v15 and older because they don't expose a component stack anyway.

  if (typeof findFiberByHostInstance !== 'function') {
    return;
  } // currentDispatcherRef gets injected for v16.8+ to support hooks inspection.
  // getCurrentFiber gets injected for v16.9+.


  if (currentDispatcherRef != null && typeof getCurrentFiber === 'function') {
    const {
      ReactTypeOfWork
    } = Object(_renderer__WEBPACK_IMPORTED_MODULE_1__[/* getInternalReactConstants */ "b"])(version);
    injectedRenderers.set(renderer, {
      currentDispatcherRef,
      getCurrentFiber,
      workTagMap: ReactTypeOfWork,
      onErrorOrWarning
    });
  }
}