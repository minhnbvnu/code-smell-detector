function* startOrRenewStreamWathcer () {
  yield fork(takeEvery, STARTORRENEW_STREAMS, startOrRenewStream)
}