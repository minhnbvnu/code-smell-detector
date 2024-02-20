function* queryFlowWatcher () {
  yield fork(takeEvery, LOAD_FLOW_DETAIL, queryFlow)
}