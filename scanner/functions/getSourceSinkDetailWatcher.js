function* getSourceSinkDetailWatcher () {
  yield fork(takeLatest, LOAD_SOURCESINK_DETAIL, getSourceSinkDetail)
}