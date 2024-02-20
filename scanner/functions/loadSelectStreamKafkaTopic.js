function loadSelectStreamKafkaTopic (projectId, streamType, functionType, resolve) {
  return {
    type: LOAD_SELECT_STREAM_KAFKA_TOPIC,
    payload: {
      projectId,
      streamType,
      functionType,
      resolve
    }
  }
}