function* querySchemaWatcher () {
  yield fork(takeLatest, QUERY_SCHEMA_CONFIG, querySchema)
}