function* editNamespace ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: api.namespace,
      data: payload.value
    })
    yield put(namespaceEdited(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}