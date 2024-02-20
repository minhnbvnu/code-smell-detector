function* getSinkWriteRrrorDetailWatcher () {
  yield fork(takeLatest, LOAD_SINKWRITERROR_DETAIL, getSinkWriteRrrorDetail)
}