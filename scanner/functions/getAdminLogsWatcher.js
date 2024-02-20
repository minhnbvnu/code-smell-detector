function* getAdminLogsWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_LOGS_INFO, getAdminLogs)
}