function* deleteStreamWathcer () {
  yield fork(takeEvery, DELETE_STREAMS, deleteStream)
}