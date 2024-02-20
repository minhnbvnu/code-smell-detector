function* getAdminSingleJobWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_SINGLE_JOB, getAdminSingleJob)
}