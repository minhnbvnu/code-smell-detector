function* getStreamConfigJvmWatcher () {
  yield fork(takeLatest, LOAD_STREAM_CONFIG_JVM, getStreamConfigJvm)
}