function postUserTopicLoaded (result) {
  return {
    type: POST_USER_TOPIC_SUCCESS,
    payload: {
      result
    }
  }
}