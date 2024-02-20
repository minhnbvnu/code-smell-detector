function* queryUserWatcher () {
  yield fork(takeLatest, LOAD_USER_DETAIL, queryUser)
}