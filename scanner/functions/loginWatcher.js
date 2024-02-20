function* loginWatcher () {
  yield fork(takeLatest, LOGIN, login)
}