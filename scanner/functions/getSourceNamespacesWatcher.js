function* getSourceNamespacesWatcher () {
  yield fork(takeLatest, LOAD_SOURCE_NAMESPACES, getSourceNamespaces)
}