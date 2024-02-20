function* getSelectNamespaceWatcher () {
  yield fork(takeLatest, LOAD_SINGLE_NAMESPACE, getSingleNamespace)
}