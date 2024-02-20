function* deleteInstanceActionWatcher () {
  yield fork(takeEvery, DELETE_INSTANCE, deleteInstanceAction)
}