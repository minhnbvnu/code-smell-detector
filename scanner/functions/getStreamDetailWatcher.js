function* getStreamDetailWatcher () {
  yield fork(takeLatest, LOAD_STREAM_DETAIL, getStreamDetail)
}