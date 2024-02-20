function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
  };
}