function* getInstancesWatcher () {
  yield fork(takeLatest, LOAD_INSTANCES, getInstances)
}