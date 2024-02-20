function* loadJobNameValueWatcher () {
  yield fork(takeEvery, LOAD_JOB_NAME, loadJobNameValue)
}