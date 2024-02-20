function* getSourceToSinkWatcher () {
  yield fork(throttle, 500, LOAD_SOURCETOSINK_EXIST, getSourceToSink)
}