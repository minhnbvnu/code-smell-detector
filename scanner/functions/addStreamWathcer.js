function* addStreamWathcer () {
  yield fork(takeEvery, ADD_STREAMS, addStream)
}