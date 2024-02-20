function* getSourceLogDetailWatcher () {
  yield fork(takeLatest, LOAD_SOURCELOG_DETAIL, getSourceLogDetail)
}