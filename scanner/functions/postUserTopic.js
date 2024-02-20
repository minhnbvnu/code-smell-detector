function postUserTopic (projectId, streamId, topic, resolve, reject) {
  return {
    type: POST_USER_TOPIC,
    payload: {
      projectId,
      streamId,
      topic,
      resolve,
      reject
    }
  }
}