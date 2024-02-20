function* getLastestOffsetWatcher () {
  yield fork(takeLatest, LOAD_LASTEST_OFFSET, getLastestOffset)
}