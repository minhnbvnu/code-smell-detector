function selectStreamKafkaTopicLoaded (result) {
  return {
    type: LOAD_SELECT_STREAM_KAFKA_TOPIC_SUCCESS,
    payload: {
      result
    }
  }
}