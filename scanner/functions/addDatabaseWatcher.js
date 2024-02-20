function* addDatabaseWatcher () {
  yield fork(takeEvery, ADD_DATABASE, addDatabase)
}