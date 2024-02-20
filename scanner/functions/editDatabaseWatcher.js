function* editDatabaseWatcher () {
  yield fork(takeEvery, EDIT_DATABASE, editDatabase)
}