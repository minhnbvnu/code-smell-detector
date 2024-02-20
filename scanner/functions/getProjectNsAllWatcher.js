function* getProjectNsAllWatcher () {
  yield fork(takeLatest, LOAD_PROJECT_NS_ALL, getProjectNsAll)
}