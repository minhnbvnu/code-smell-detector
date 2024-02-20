function* editJobWatcher () {
  yield fork(takeEvery, EDIT_JOB, editJob)
}