function* singleInstanceWatcher () {
  yield fork(takeEvery, LOAD_SINGLE_INSTANCE, getSingleInstance)
}