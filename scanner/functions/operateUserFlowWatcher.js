function* operateUserFlowWatcher () {
  yield fork(takeEvery, OPERATE_USER_FLOW, operateUserFlow)
}