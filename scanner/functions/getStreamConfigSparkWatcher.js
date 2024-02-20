function* getStreamConfigSparkWatcher () {
  yield fork(takeLatest, LOAD_STREAM_CONFIG_SPARK, getStreamConfigSpark)
}