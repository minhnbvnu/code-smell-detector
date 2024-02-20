function* singleDatabaseWatcher () {
  yield fork(takeEvery, LOAD_SINGLE_DATABASE, getSingleDatabase)
}