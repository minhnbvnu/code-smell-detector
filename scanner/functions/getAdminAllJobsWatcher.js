function* getAdminAllJobsWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_ALL_JOBS, getAdminAllJobs)
}