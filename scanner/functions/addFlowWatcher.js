function* addFlowWatcher () {
  yield fork(takeEvery, ADD_FLOWS, addFlow)
}