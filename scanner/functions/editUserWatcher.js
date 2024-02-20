function* editUserWatcher () {
  yield fork(takeEvery, EDIT_USER, editUser)
}