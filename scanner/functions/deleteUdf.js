function* deleteUdf ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.udf}/${payload.udfId}`
    })
    if (result.code === 412) {
      yield put(udfDeletedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code === 200) {
      yield put(udfDeleted(payload.udfId))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}