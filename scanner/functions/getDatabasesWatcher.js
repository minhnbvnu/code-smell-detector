function* getDatabasesWatcher () {
  yield fork(takeLatest, LOAD_DATABASES, getDatabases)
}