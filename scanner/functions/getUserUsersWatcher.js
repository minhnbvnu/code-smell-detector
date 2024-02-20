function* getUserUsersWatcher () {
  yield fork(takeLatest, LOAD_USER_USERS, getUserUsers)
}