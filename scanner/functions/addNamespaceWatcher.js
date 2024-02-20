function* addNamespaceWatcher () {
  yield fork(takeEvery, ADD_NAMESPACE, addNamespace)
}