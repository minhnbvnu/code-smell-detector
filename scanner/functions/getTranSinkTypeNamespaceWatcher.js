function* getTranSinkTypeNamespaceWatcher () {
  yield fork(takeLatest, LOAD_TRANSINKTYPE_NAMESPACE, getTranSinkTypeNamespace)
}