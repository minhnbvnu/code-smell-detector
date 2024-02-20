function* loadJobSourceNsValueWatcher () {
  yield fork(takeEvery, LOAD_JOB_SOURCENS, loadJobSourceNsValue)
}