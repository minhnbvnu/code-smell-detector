function* checkConnectUrlWatcher () {
  yield throttle(1000, CHECK_URL, checkConnectUrl)
}