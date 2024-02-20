function* addJobWatcher () {
  yield fork(takeEvery, ADD_JOB, addJob)
}