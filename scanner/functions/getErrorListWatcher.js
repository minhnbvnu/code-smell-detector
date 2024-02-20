function* getErrorListWatcher () {
  yield fork(takeLatest, LOAD_FLOW_ERROR_LIST, getErrorList)
}