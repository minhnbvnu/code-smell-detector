function* getSelectUsersWatcher () {
  yield fork(takeLatest, LOAD_SELECT_USERS, getSelectUsers)
}