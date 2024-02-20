function replaceReducers(defaultReducers) {
  const merged = Object.assign({}, defaultReducers, store.asyncReducers);
  const combined = combineReducers(merged);
  store.replaceReducer(combined);
}