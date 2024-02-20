function* getUserNamespaces ({ payload }) {
  try {
    const namespaces = yield call(request, `${api.projectUserList}/${payload.projectId}/namespaces`)
    yield put(userNamespacesLoaded(namespaces.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}