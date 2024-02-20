function* getSelectNamespaces ({ payload }) {
  try {
    const namespaces = yield call(request, `${api.projectList}/${payload.projectId}/namespaces`)
    yield put(selectNamespacesLoaded(namespaces.payload))
    payload.resolve(namespaces.payload)
  } catch (err) {
    yield put(getError(err))
  }
}