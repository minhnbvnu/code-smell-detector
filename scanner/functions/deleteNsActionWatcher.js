function* deleteNsActionWatcher () {
  yield fork(takeEvery, DELETE_USER, deleteUserAction)
}