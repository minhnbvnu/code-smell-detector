function* deleteNsAction ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.namespace}/${payload.namespaceId}`
    })
    if (result.code === 412) {
      yield put(nsDeletedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code === 200) {
      yield put(nsDeleted(payload.namespaceId))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}