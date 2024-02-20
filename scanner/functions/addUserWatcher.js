function* addUserWatcher () {
  yield fork(takeEvery, ADD_USER, addUser)
}