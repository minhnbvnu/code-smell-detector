function* operateStreamWathcer () {
  yield fork(takeEvery, OPERATE_STREAMS, operateStream)
}