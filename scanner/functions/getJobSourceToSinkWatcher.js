function* getJobSourceToSinkWatcher () {
  yield fork(throttle, 500, LOAD_JOB_SOURCETOSINK_EXIST, getJobSourceToSink)
}