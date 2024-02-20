function* addInstanceWatcher () {
  yield fork(takeEvery, ADD_INSTANCE, addInstance)
}