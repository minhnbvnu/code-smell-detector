function* getUserJobLogsWatcher () {
  yield fork(takeLatest, LOAD_USER_JOB_LOGS, getUserJobLogs)
}