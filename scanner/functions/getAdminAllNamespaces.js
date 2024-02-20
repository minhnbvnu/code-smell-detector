function* getAdminAllNamespaces ({ payload }) {
  try {
    const namespaces = yield call(request, api.namespace)
    yield put(adminAllNamespacesLoaded(namespaces.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}