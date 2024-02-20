function* getUserStreamsWatcher () {
  yield fork(takeLatest, LOAD_USER_STREAMS, getUserStreams)
}