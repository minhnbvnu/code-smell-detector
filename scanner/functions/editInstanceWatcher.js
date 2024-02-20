function* editInstanceWatcher () {
  yield fork(takeEvery, EDIT_INSTANCE, editInstance)
}