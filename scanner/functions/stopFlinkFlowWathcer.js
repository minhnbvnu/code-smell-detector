function* stopFlinkFlowWathcer () {
  yield fork(takeEvery, STOPFLINK_FLOWS, stopFlinkFlow)
}