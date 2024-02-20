function* deleteSingleProWatcher () {
  yield fork(takeEvery, DELETE_SINGLE_PROJECT, deleteSinglePro)
}