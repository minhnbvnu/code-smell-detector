function* getSourceInputWatcher () {
  yield fork(takeEvery, LOAD_SOURCEINPUT, getSourceInput)
}