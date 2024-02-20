function* editProjectWatcher () {
  yield fork(takeEvery, EDIT_PROJECT, editProject)
}