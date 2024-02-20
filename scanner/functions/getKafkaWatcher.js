function* getKafkaWatcher () {
  yield fork(takeLatest, LOAD_KAFKA, getKafka)
}