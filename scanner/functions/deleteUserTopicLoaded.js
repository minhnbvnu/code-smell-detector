function deleteUserTopicLoaded (result) {
  return {
    type: DELETE_USER_TOPIC_SUCCESS,
    payload: {
      result
    }
  }
}