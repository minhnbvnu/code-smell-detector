function* getUserAllFlowsWatcher () {
  yield fork(takeLatest, LOAD_USER_ALL_FLOWS, getUserAllFlows)
}