function* deleteDBActionWatcher () {
  yield fork(takeEvery, DELETE_DB, deleteDBAction)
}