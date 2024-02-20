function* editLogFormWatcher () {
  yield fork(takeEvery, EDIT_LOGFORM, editLogForm)
}