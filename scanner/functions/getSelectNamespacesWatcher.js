function* getSelectNamespacesWatcher () {
  yield fork(takeLatest, LOAD_SELECT_NAMESPACES, getSelectNamespaces)
}