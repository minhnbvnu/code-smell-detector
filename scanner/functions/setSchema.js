function* setSchema ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'put',
      url: `${api.namespace}/${payload.namespaceId}/schema/${payload.type}`,
      data: payload.value
    })
    yield put(schemaSetted(result.payload))
    payload.resolve()
  } catch (err) {
    yield put(getError())
  }
}