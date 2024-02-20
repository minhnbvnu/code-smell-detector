function* deleteInstanceAction ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.instance}/${payload.instanceId}`
    })
    if (result.code === 412) {
      yield put(instanceDeletedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code === 200) {
      yield put(instanceDeleted(payload.instanceId))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}