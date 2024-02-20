function* getAdminSingleFlowWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_SINGLE_STREAM, getAdminSingleStream)
}