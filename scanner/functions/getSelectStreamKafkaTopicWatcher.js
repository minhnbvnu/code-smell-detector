function* getSelectStreamKafkaTopicWatcher () {
  yield fork(takeLatest, LOAD_SELECT_STREAM_KAFKA_TOPIC, getSelectStreamKafkaTopic)
}