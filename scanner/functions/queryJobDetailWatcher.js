function* queryJobDetailWatcher () {
  yield fork(takeEvery, LOAD_JOB_DETAIL, queryJobDetail)
}