function* editNamespaceWatcher () {
  yield fork(takeEvery, EDIT_NAMESPACE, editNamespace)
}