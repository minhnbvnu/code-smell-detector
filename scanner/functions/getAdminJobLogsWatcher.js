function* getAdminJobLogsWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_JOB_LOGS, getAdminJobLogs)
}