function* removeUserTopicWatcher () {
  yield fork(takeEvery, DELETE_USER_TOPIC, removeUserTopic)
}