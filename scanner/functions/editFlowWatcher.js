function* editFlowWatcher () {
  yield fork(takeEvery, EDIT_FLOWS, editFlow)
}