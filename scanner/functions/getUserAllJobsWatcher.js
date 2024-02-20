function* getUserAllJobsWatcher () {
  yield fork(takeLatest, LOAD_USER_ALL_JOBS, getUserAllJobs)
}