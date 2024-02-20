function* getTypeNamespaceWatcher () {
  yield fork(takeLatest, LOAD_SOURCESINKTYPE_NAMESPACE, getTypeNamespace)
}