function* getDatabaseInstanceWatcher () {
  yield fork(takeLatest, LOAD_DATABASES_INSTANCE, getDatabaseInstance)
}