function* getNamespaceDatabaseWatcher () {
  yield fork(takeLatest, LOAD_NAMESPACE_DATABASE, getNamespaceDatabase)
}