function* getResourcesWatcher () {
  yield fork(takeLatest, LOAD_RESOURCES, getResources)
}