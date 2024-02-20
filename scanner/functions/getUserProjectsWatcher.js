function* getUserProjectsWatcher () {
  yield fork(takeLatest, LOAD_USER_PROJECTS, getUserProjects)
}