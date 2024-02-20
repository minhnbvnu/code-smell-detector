function* loadJobSinkNsValueWatcher () {
  yield fork(takeEvery, LOAD_JOB_SINKNS, loadJobSinkNsValue)
}