function* getSourceNsVersionWatcher () {
  yield fork(takeLatest, GET_SOURCE_NS_VERSION, getSourceNsVersion)
}