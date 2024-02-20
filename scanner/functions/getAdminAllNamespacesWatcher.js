function* getAdminAllNamespacesWatcher () {
  yield fork(takeLatest, LOAD_ADMIN_ALL_NAMESPACES, getAdminAllNamespaces)
}