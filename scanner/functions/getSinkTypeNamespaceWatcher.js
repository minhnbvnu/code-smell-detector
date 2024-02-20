function* getSinkTypeNamespaceWatcher () {
  yield fork(takeLatest, LOAD_SINKTYPE_NAMESPACE, getSinkTypeNamespace)
}