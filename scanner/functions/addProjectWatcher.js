function* addProjectWatcher () {
  yield fork(takeEvery, ADD_PROJECT, addProject)
}