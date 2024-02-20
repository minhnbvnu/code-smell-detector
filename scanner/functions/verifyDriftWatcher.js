function* verifyDriftWatcher () {
  yield fork(takeLatest, VERIFY_DRIFT, verifyDrift)
}