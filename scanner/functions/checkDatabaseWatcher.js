function* checkDatabaseWatcher () {
  yield throttle(1000, CHECK_DATABASE, checkDatabase)
}