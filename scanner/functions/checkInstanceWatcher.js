function* checkInstanceWatcher () {
  yield throttle(1000, CHECK_INSTANCE, checkInstance)
}