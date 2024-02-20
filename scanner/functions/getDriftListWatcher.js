function* getDriftListWatcher () {
  yield fork(takeLatest, LOAD_DRIFT_LIST, getDriftList)
}