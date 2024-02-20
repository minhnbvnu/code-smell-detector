function kafkaLoaded (result) {
  return {
    type: LOAD_KAFKA_SUCCESS,
    payload: {
      result
    }
  }
}