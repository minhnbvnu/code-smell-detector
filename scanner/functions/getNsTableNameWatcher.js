function* getNsTableNameWatcher () {
  yield fork(throttle, 500, LOAD_TABLE_NAME_EXIST, getNsTableName)
}