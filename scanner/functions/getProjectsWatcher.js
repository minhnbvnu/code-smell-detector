function* getProjectsWatcher () {
  yield fork(takeLatest, LOAD_PROJECTS, getProjects)
}