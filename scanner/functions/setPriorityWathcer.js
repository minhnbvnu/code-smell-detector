function* setPriorityWathcer () {
  yield fork(takeEvery, SET_FLOW_PRIORITY, setPriority)
}