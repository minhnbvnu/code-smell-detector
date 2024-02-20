function deleteUserTopic (projectId, streamId, topicId, resolve, reject) {
  return {
    type: DELETE_USER_TOPIC,
    payload: {
      projectId,
      streamId,
      topicId,
      resolve,
      reject
    }
  }
}