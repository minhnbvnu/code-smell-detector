function* getStreamNameValueWatcher () {
  yield fork(takeLatest, LOAD_STREAM_NAME_VALUE, getStreamNameValue)
}