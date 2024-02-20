function* getProjectUserAllWatcher () {
  yield fork(takeLatest, LOAD_PROJECT_USER_ALL, getProjectUserAll)
}