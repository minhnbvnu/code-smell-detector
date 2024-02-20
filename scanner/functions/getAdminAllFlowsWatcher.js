function* getAdminAllFlowsWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_ALL_STREAMS, getAdminAllStreams)
}