function injectAsyncReducers(asyncReducers) {
  const injectReducers = Object.keys(asyncReducers).reduce((all, item) => {
    if (store.asyncReducers[item]) {
      delete all[item];
    }

    return all;
  }, asyncReducers);

  store.asyncReducers = Object.assign({}, store.asyncReducers, injectReducers);
  replaceReducers(rootReducer);
}