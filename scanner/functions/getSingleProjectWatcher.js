function* getSingleProjectWatcher () {
  yield fork(takeLatest, LOAD_SINGLE_PROJECT, getSingleProject)
}