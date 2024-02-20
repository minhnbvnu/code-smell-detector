function* getUserNamespacesWatcher () {
  yield fork(takeLatest, LOAD_USER_NAMESPACES, getUserNamespaces)
}