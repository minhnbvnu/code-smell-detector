function* addNamespace ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'post',
      url: api.namespace,
      data: payload.value
    })
    yield put(namespaceAdded(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError(err))
  }
}