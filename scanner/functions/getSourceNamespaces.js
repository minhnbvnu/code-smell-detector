function* getSourceNamespaces () {
  try {
    const sourceNamespaces = yield call(request, api.sourceNamespace)
    yield put(sourceNamespacesLoaded(sourceNamespaces))
  } catch (err) {
    yield put(getError(err))
  }
}