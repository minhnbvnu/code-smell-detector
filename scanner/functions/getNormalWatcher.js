function* getNormalWatcher () {
  yield fork(takeLatest, LOAD_NORMAL, getNormal)
}