function* getSingleNamespace ({ payload }) {
  try {
    const namespace = yield call(request, `${api.namespace}/${payload.namespaceId}`)
    yield put(singleNamespaceLoaded(namespace.payload))
    payload.resolve(namespace.payload)
  } catch (err) {
    yield put(getError(err))
  }
}