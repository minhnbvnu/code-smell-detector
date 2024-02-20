function* queryJobWatcher () {
  yield fork(takeEvery, QUERY_JOB, queryJob)
}