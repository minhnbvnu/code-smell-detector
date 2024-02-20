function* getPerformancesWatcher () {
  yield fork(takeLatest, LOAD_PERFORMANCES, getPerformances)
}