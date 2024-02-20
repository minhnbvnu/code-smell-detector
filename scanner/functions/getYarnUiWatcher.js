function* getYarnUiWatcher () {
  yield fork(takeEvery, LOAD_YARN_UI, getYarnUi)
}