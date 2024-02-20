function* deleteDBAction ({ payload }) {
  try {
    const result = yield call(request, {
      method: 'delete',
      url: `${api.database}/${payload.databaseId}`
    })
    if (result.code === 412) {
      yield put(dBDeletedError(result.msg))
      payload.reject(result.msg)
    } else if (result.code === 200) {
      yield put(dBDeleted(payload.databaseId))
      payload.resolve()
    }
  } catch (err) {
    yield put(getError(err))
  }
}