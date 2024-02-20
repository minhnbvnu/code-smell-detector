function* setSchemaWatcher () {
  yield fork(takeLatest, SET_SCHEMA, setSchema)
}