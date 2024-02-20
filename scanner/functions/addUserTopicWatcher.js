function* addUserTopicWatcher () {
  yield fork(takeEvery, POST_USER_TOPIC, addUserTopic)
}