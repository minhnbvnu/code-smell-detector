function* getStreamDefaultconfigsWatcher () {
  yield fork(takeLatest, LOAD_STREAM_CONFIGS, getStreamDefaultconfigs)
}