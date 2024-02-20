function* editNormalWatcher () {
  yield fork(takeEvery, EDIT_NORMAL, editNormal)
}