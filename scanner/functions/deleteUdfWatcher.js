function* deleteUdfWatcher () {
  yield fork(takeEvery, DELETE_UDF, deleteUdf)
}