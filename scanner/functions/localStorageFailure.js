function localStorageFailure(key, e) {
  debug('localStorage failed with', e);
  cleanup();
  store = moduleStore;
  return store.get(key);
}