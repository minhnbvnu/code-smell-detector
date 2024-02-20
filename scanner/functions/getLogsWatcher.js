function* getLogsWatcher () {
  yield fork(takeLatest, LOAD_LOGS_INFO, getLogs)
}